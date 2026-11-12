from pathlib import Path
from textwrap import dedent

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf" / "HelpHive_Complete_Beginner_Code_Guide.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
INK = HexColor("#173B33")
GREEN = HexColor("#2F6655")
MINT = HexColor("#DDEBE5")
CREAM = HexColor("#F6F3EB")
PAPER = HexColor("#FFFDF8")
CORAL = HexColor("#FF765F")
YELLOW = HexColor("#F1C654")
MUTED = HexColor("#66756F")
LINE = HexColor("#D8E0DA")
RED = HexColor("#A84034")
BLUE = HexColor("#315F8C")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold",
    fontSize=34, leading=38, textColor=colors.white, spaceAfter=12, alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    name="CoverSub", parent=styles["Normal"], fontName="Helvetica",
    fontSize=14, leading=20, textColor=HexColor("#DDEBE5"), spaceAfter=12,
))
styles.add(ParagraphStyle(
    name="Chapter", parent=styles["Heading1"], fontName="Helvetica-Bold",
    fontSize=23, leading=28, textColor=INK, spaceBefore=6, spaceAfter=14,
    keepWithNext=True,
))
styles.add(ParagraphStyle(
    name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold",
    fontSize=15, leading=19, textColor=GREEN, spaceBefore=14, spaceAfter=7,
    keepWithNext=True,
))
styles.add(ParagraphStyle(
    name="Subsection", parent=styles["Heading3"], fontName="Helvetica-Bold",
    fontSize=11.5, leading=15, textColor=INK, spaceBefore=10, spaceAfter=5,
    keepWithNext=True,
))
styles.add(ParagraphStyle(
    name="Body", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.5, leading=13.6, textColor=INK, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="Small", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=7.8, leading=10.5, textColor=MUTED, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="Callout", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9, leading=13, textColor=INK, leftIndent=2, rightIndent=2,
))
styles.add(ParagraphStyle(
    name="CodeBlock", parent=styles["Code"], fontName="Courier",
    fontSize=7.1, leading=9.4, textColor=HexColor("#E8F3EE"),
    spaceBefore=0, spaceAfter=0,
))
styles.add(ParagraphStyle(
    name="Path", parent=styles["Code"], fontName="Courier-Bold",
    fontSize=7.5, leading=10, textColor=GREEN,
))
styles.add(ParagraphStyle(
    name="TableHeader", parent=styles["BodyText"], fontName="Helvetica-Bold",
    fontSize=8, leading=10, textColor=colors.white,
))
styles.add(ParagraphStyle(
    name="TableCell", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=7.6, leading=10.2, textColor=INK,
))
styles.add(ParagraphStyle(
    name="TableCellSmall", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=6.8, leading=8.7, textColor=INK,
))
styles.add(ParagraphStyle(
    name="TOCHeading", parent=styles["Heading1"], fontName="Helvetica-Bold",
    fontSize=24, leading=28, textColor=INK, spaceAfter=14,
))


def P(text, style="Body"):
    return Paragraph(text, styles[style])


def bullets(items, level=0):
    return ListFlowable(
        [ListItem(P(item), leftIndent=12) for item in items],
        bulletType="bullet", start="circle", leftIndent=18 + level * 10,
        bulletFontName="Helvetica", bulletFontSize=7, bulletColor=CORAL,
        spaceAfter=7,
    )


def numbered(items):
    return ListFlowable(
        [ListItem(P(item), leftIndent=14) for item in items],
        bulletType="1", leftIndent=24, bulletFontName="Helvetica-Bold",
        bulletFontSize=8, bulletColor=GREEN, spaceAfter=8,
    )


def code(text):
    block = Preformatted(dedent(text).strip("\n"), styles["CodeBlock"])
    table = Table([[block]], colWidths=[171 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK),
        ("BOX", (0, 0), (-1, -1), 0.7, GREEN),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    table.spaceBefore = 4
    table.spaceAfter = 9
    return table


def callout(title, body, tone="green"):
    palettes = {
        "green": (MINT, GREEN),
        "yellow": (HexColor("#FFF4C9"), HexColor("#8A6612")),
        "coral": (HexColor("#FFE6E0"), RED),
        "blue": (HexColor("#E5EEF7"), BLUE),
    }
    bg, accent = palettes[tone]
    data = [[P(f"<b>{title}</b><br/>{body}", "Callout")]]
    t = Table(data, colWidths=[171 * mm], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("BOX", (0, 0), (-1, -1), 0.7, accent),
        ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    return t


def data_table(headers, rows, widths=None, small=False):
    cell_style = styles["TableCellSmall" if small else "TableCell"]
    table_data = [[P(h, "TableHeader") for h in headers]]
    for row in rows:
        table_data.append([P(str(cell), "Path" if i == 0 and "<" not in str(cell) else cell_style.name)
                           for i, cell in enumerate(row)])
    if widths is None:
        widths = [171 * mm / len(headers)] * len(headers)
    t = Table(table_data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, CREAM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


class Diagram(Flowable):
    def __init__(self, kind, height=165):
        super().__init__()
        self.kind = kind
        self.width = 171 * mm
        self.height = height

    def wrap(self, availWidth, availHeight):
        self.width = min(self.width, availWidth)
        return self.width, self.height

    def _box(self, c, x, y, w, h, title, subtitle="", fill=colors.white, stroke=GREEN):
        c.setFillColor(fill)
        c.setStrokeColor(stroke)
        c.setLineWidth(1)
        c.roundRect(x, y, w, h, 6, fill=1, stroke=1)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawCentredString(x + w / 2, y + h - 13, title)
        if subtitle:
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 6.5)
            lines = subtitle.split("|")
            for idx, line in enumerate(lines[:3]):
                c.drawCentredString(x + w / 2, y + h - 25 - idx * 8, line)

    def _arrow(self, c, x1, y1, x2, y2, label=""):
        c.setStrokeColor(CORAL)
        c.setFillColor(CORAL)
        c.setLineWidth(1.4)
        c.line(x1, y1, x2, y2)
        if abs(x2 - x1) >= abs(y2 - y1):
            direction = 1 if x2 > x1 else -1
            pts = [x2, y2, x2 - direction * 6, y2 + 3, x2 - direction * 6, y2 - 3]
        else:
            direction = 1 if y2 > y1 else -1
            pts = [x2, y2, x2 + 3, y2 - direction * 6, x2 - 3, y2 - direction * 6]
        c.line(pts[0], pts[1], pts[2], pts[3])
        c.line(pts[0], pts[1], pts[4], pts[5])
        if label:
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 6.4)
            c.drawCentredString((x1 + x2) / 2, (y1 + y2) / 2 + 5, label)

    def draw(self):
        c = self.canv
        w = self.width
        c.setFillColor(CREAM)
        c.roundRect(0, 0, w, self.height, 9, fill=1, stroke=0)
        if self.kind == "architecture":
            bw, bh, gap = 82, 48, 17
            xs = [12 + i * (bw + gap) for i in range(5)]
            y = 91
            labels = [
                ("Browser", "HTML + CSS|sessionStorage", HexColor("#FFF4C9")),
                ("Angular", "signals + forms|HttpClient", MINT),
                ("Spring API", "security + MVC|business logic", HexColor("#FFE6E0")),
                ("JPA", "repositories|Hibernate", HexColor("#E5EEF7")),
                ("PostgreSQL", "app_users|help_posts", colors.white),
            ]
            for i, (title, sub, fill) in enumerate(labels):
                self._box(c, xs[i], y, bw, bh, title, sub, fill)
                if i < 4:
                    self._arrow(c, xs[i] + bw, y + bh / 2, xs[i + 1], y + bh / 2)
            self._box(c, 113, 20, 116, 42, "Local development", "Angular :4200 -> proxy|Spring :8080 + H2", colors.white)
            self._box(c, 294, 20, 116, 42, "Production", "one Render URL|Neon database", colors.white)
            self._arrow(c, 253, y, 200, 62, "dev")
            self._arrow(c, 285, y, 352, 62, "deploy")
        elif self.kind == "reading":
            steps = [
                "1  Boot files", "2  Models", "3  Angular UI", "4  Client services",
                "5  Security", "6  Controllers", "7  Services", "8  Database", "9  Delivery"
            ]
            x, y = 14, self.height - 42
            for i, label in enumerate(steps):
                fill = [MINT, HexColor("#FFF4C9"), HexColor("#FFE6E0")][i % 3]
                self._box(c, x, y, 148, 28, label, "", fill)
                if i < len(steps) - 1:
                    if (i + 1) % 3:
                        self._arrow(c, x + 148, y + 14, x + 164, y + 14)
                        x += 164
                    else:
                        self._arrow(c, x + 74, y, x + 74, y - 16)
                        x = 14
                        y -= 44
        elif self.kind in ("register", "login", "request"):
            actors = ["Browser", "Angular", "Security", "Controller", "Service", "Database"]
            xs = [18 + i * 86 for i in range(6)]
            top = self.height - 25
            for x, actor in zip(xs, actors):
                c.setFillColor(GREEN)
                c.setFont("Helvetica-Bold", 7)
                c.drawCentredString(x + 30, top, actor)
                c.setStrokeColor(LINE)
                c.setDash(2, 2)
                c.line(x + 30, top - 7, x + 30, 14)
            c.setDash()
            if self.kind == "register":
                events = [
                    (0, 1, "submit name/email/password"),
                    (1, 2, "POST /api/auth/register"),
                    (2, 3, "public endpoint"),
                    (3, 4, "validated request"),
                    (4, 5, "BCrypt hash + INSERT"),
                    (5, 4, "saved user"),
                    (4, 1, "UserResponse - no token"),
                    (1, 0, "show: now sign in"),
                ]
            elif self.kind == "login":
                events = [
                    (0, 1, "submit email/password"),
                    (1, 2, "POST /api/auth/login"),
                    (2, 3, "public endpoint"),
                    (3, 4, "find user + verify"),
                    (4, 5, "SELECT app_users"),
                    (5, 4, "hash row"),
                    (4, 1, "JWT + safe user"),
                    (1, 0, "save session; enter"),
                ]
            else:
                events = [
                    (0, 1, "click / form action"),
                    (1, 2, "Bearer JWT + /api/posts"),
                    (2, 2, "verify signature + expiry"),
                    (2, 3, "AuthenticatedUser"),
                    (3, 4, "call use case"),
                    (4, 5, "JPA query / change"),
                    (5, 4, "entity data"),
                    (4, 1, "response DTO JSON"),
                    (1, 0, "signals update UI"),
                ]
            y = top - 22
            for a, b, label in events:
                self._arrow(c, xs[a] + 30, y, xs[b] + 30, y, label)
                y -= 15
        elif self.kind == "database":
            self._box(c, 38, 39, 184, 104, "app_users", "id (PK)|email (unique)|name, password_hash|role, created_at", MINT)
            self._box(c, w - 222, 23, 184, 136, "help_posts", "id (PK)|owner_id (FK, nullable)|title, description|author_name, contact|location, category|type, status|created_at, updated_at", HexColor("#FFF4C9"))
            self._arrow(c, 222, 93, w - 222, 93, "one user owns many posts")
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 7)
            c.drawString(42, 20, "Demo posts have owner_id = NULL and are intentionally read-only.")
        elif self.kind == "deploy":
            labels = [
                ("Git push", "main branch"), ("GitHub Actions", "tests + builds"),
                ("Render", "Blueprint + Docker"), ("Spring JAR", "Angular included"),
                ("Neon", "persistent PostgreSQL")
            ]
            x, y, bw = 12, 80, 90
            for i, (title, sub) in enumerate(labels):
                self._box(c, x, y, bw, 48, title, sub, [MINT, colors.white, HexColor("#FFE6E0")][i % 3])
                if i < len(labels) - 1:
                    self._arrow(c, x + bw, y + 24, x + bw + 12, y + 24)
                x += bw + 12
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 7)
            c.drawCentredString(w / 2, 42, "Render runs one container. Spring serves both the Angular files and the REST API.")


class GuideDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)
        frame = Frame(20 * mm, 18 * mm, PAGE_W - 40 * mm, PAGE_H - 34 * mm,
                      leftPadding=0, rightPadding=0, topPadding=12 * mm, bottomPadding=7 * mm)
        self.addPageTemplates(PageTemplate(id="main", frames=frame, onPage=self.draw_page))
        self._heading_seq = 0

    def beforeDocument(self):
        self._heading_seq = 0

    def draw_page(self, canvas, doc):
        canvas.saveState()
        if doc.page == 1:
            canvas.setFillColor(INK)
            canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
            canvas.setFillColor(GREEN)
            canvas.circle(PAGE_W - 24 * mm, PAGE_H - 26 * mm, 34 * mm, fill=1, stroke=0)
            canvas.setFillColor(CORAL)
            canvas.circle(PAGE_W - 12 * mm, 30 * mm, 24 * mm, fill=1, stroke=0)
            canvas.setFillColor(YELLOW)
            canvas.circle(20 * mm, 22 * mm, 8 * mm, fill=1, stroke=0)
        else:
            canvas.setStrokeColor(LINE)
            canvas.setLineWidth(0.5)
            canvas.line(20 * mm, PAGE_H - 15 * mm, PAGE_W - 20 * mm, PAGE_H - 15 * mm)
            canvas.setFillColor(GREEN)
            canvas.setFont("Helvetica-Bold", 7.5)
            canvas.drawString(20 * mm, PAGE_H - 11 * mm, "HELPHIVE - COMPLETE BEGINNER CODE GUIDE")
            canvas.setFillColor(MUTED)
            canvas.setFont("Helvetica", 7)
            canvas.drawRightString(PAGE_W - 20 * mm, 10 * mm, f"Page {doc.page}")
            canvas.drawString(20 * mm, 10 * mm, "Java 21 | Spring Boot 4.1 | Angular 22 | PostgreSQL")
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == "Chapter":
            level = 0
            text = flowable.getPlainText()
            self._heading_seq += 1
            key = f"heading-{self._heading_seq}"
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(text, key, level=0, closed=False)
            self.notify("TOCEntry", (level, text, self.page, key))


story = []


def chapter(title, intro=None):
    story.append(PageBreak())
    story.append(P(title, "Chapter"))
    if intro:
        story.append(P(intro))


def section(title):
    story.append(P(title, "Section"))


# Cover
story.extend([
    Spacer(1, 40 * mm),
    P("HELPHIVE", "CoverSub"),
    P("Complete Beginner<br/>Code Guide", "CoverTitle"),
    P("From first file to production request - with architecture, authentication, database, deployment, and a practical reading plan.", "CoverSub"),
    Spacer(1, 9 * mm),
    callout("Built from the actual repository", "Snapshot: main branch, commit 3476e5b. The guide reflects members-only access, separate registration and sign-in, JWT security, post ownership, Neon PostgreSQL, and Render hosting.", "yellow"),
    Spacer(1, 18 * mm),
    P("Prepared for a reader with no previous Java, Spring Boot, Angular, API, or database knowledge.", "CoverSub"),
    P("Generated: August 2026", "CoverSub"),
])

# TOC
story.append(PageBreak())
story.append(P("Contents", "TOCHeading"))
story.append(P("Use the chapters in order on your first reading. Later, use the file reference and flow diagrams as a map while you work in the code."))
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle(name="TOC1", fontName="Helvetica-Bold", fontSize=8.0, leading=9.5,
                   leftIndent=0, firstLineIndent=0, textColor=INK, spaceBefore=1),
    ParagraphStyle(name="TOC2", fontName="Helvetica", fontSize=7.8, leading=10,
                   leftIndent=12, firstLineIndent=0, textColor=MUTED, spaceBefore=1),
]
story.append(toc)

chapter("1. Start here: what this project is")
story.append(P("HelpHive is a members-only community exchange. A person creates an account, signs in, reads requests or offers, publishes a post, contacts other members, and moves their own post from OPEN to IN_PROGRESS to COMPLETED."))
story.append(Diagram("architecture", 172))
section("The five parts to keep in your head")
story.append(data_table(
    ["Part", "Plain-English job", "Where it lives"],
    [
        ["Angular frontend", "Draws the screen, validates forms, remembers UI state, and calls the API.", "frontend/src"],
        ["Spring Boot backend", "Protects data, applies rules, and exposes JSON endpoints.", "backend/src/main/java"],
        ["Database", "Permanently stores users and posts in production.", "Neon PostgreSQL"],
        ["Delivery", "Builds one deployable container and hosts it for free.", "Dockerfile + render.yaml"],
        ["Quality", "Runs automated checks whenever code is pushed.", ".github/workflows/ci.yml"],
    ], [34*mm, 91*mm, 46*mm]
))
story.append(callout("The central idea", "The browser never talks directly to the database. Angular talks to Spring Boot using HTTP. Spring Boot decides what is allowed and uses JPA to talk to PostgreSQL.", "green"))

section("What happens before and after sign-in")
story.append(data_table(
    ["Visitor state", "What Angular shows", "What the API permits"],
    [
        ["No account / signed out", "Only the non-dismissible account and sign-in gate.", "Register, login, and health check only."],
        ["Account created", "A success message and sign-in form.", "Still no post access until login."],
        ["Signed in", "The complete community interface.", "All post reads; create; owner-only changes."],
        ["Expired token", "Returns to sign-in with a session-expired message.", "401 Unauthorized."],
    ], [37*mm, 67*mm, 67*mm]
))

chapter("2. Vocabulary for a complete beginner")
story.append(P("You do not need to memorize these definitions. Read them once, then return here whenever a word feels unfamiliar."))
story.append(data_table(
    ["Word", "Meaning in this project"],
    [
        ["Frontend", "The Angular application running in the user's browser."],
        ["Backend", "The Spring Boot Java application running on Render or localhost:8080."],
        ["API", "A set of URLs such as POST /api/auth/login that accept and return JSON."],
        ["HTTP method", "The action word: GET reads, POST creates, PUT replaces, PATCH changes part, DELETE removes."],
        ["JSON", "Text format used to move structured data between Angular and Spring."],
        ["Entity", "A Java object mapped to a database table."],
        ["Repository", "A Spring interface that performs database operations."],
        ["Service", "A class containing business rules and orchestration."],
        ["Controller", "The class that receives an HTTP request and returns an HTTP response."],
        ["Dependency injection", "Spring or Angular creates an object and supplies its dependencies automatically."],
        ["JWT", "A signed token proving which user logged in. It is not the password."],
        ["Hash", "One-way password transformation. BCrypt hashes cannot be reversed into passwords."],
        ["DTO / record", "A safe, shaped object used for API input or output instead of exposing entities."],
        ["Signal", "Angular state that automatically causes the template to update when its value changes."],
        ["Observable", "An RxJS stream representing an asynchronous result such as an HTTP response."],
        ["Environment variable", "A deployment-time setting such as DATABASE_URL or JWT_SECRET."],
    ], [39*mm, 132*mm], small=True
))

chapter("3. Technology stack: what is used and why")
story.append(data_table(
    ["Technology", "Role", "Why it fits HelpHive"],
    [
        ["Java 21", "Backend language", "Strong types, mature ecosystem, long-term support, and common enterprise usage."],
        ["Spring Boot 4.1", "Backend framework", "Starts an HTTP server, wires objects, loads configuration, and integrates the Spring libraries."],
        ["Spring Web MVC", "REST API", "Maps HTTP methods and paths to controller methods."],
        ["Spring Security", "Authentication boundary", "Blocks member endpoints and attaches the JWT user to each request."],
        ["Bean Validation", "Input safety", "Annotations such as @NotBlank and @Size reject bad requests consistently."],
        ["Spring Data JPA", "Data access", "Creates repository implementations and maps Java entities to SQL tables."],
        ["Hibernate", "JPA implementation", "Generates SQL and tracks entity changes inside transactions."],
        ["Angular 22", "Browser application", "Component templates, reactive forms, signals, and production bundling."],
        ["TypeScript 6", "Frontend language", "Adds compile-time types to JavaScript and documents API shapes."],
        ["RxJS", "Async programming", "HttpClient returns Observables; subscribe handles success and failure."],
        ["SCSS", "Styling", "Keeps the custom responsive interface in maintainable CSS-compatible syntax."],
        ["H2", "Local database", "Runs in memory with no setup, ideal for learning and tests."],
        ["PostgreSQL", "Production database", "Durable relational data, constraints, joins, and indexes."],
        ["Neon", "Hosted PostgreSQL", "Provides the external free database used by Render."],
        ["Maven Wrapper", "Java build", "Downloads the correct Maven version and builds/tests the backend."],
        ["npm + Angular CLI", "Frontend build", "Installs exact packages and runs development, tests, and production builds."],
        ["Docker", "Production packaging", "Builds Angular and Java, then runs one small Java container."],
        ["Render Blueprint", "Hosting configuration", "Creates/configures the web service from render.yaml."],
        ["GitHub Actions", "Continuous integration", "Tests backend and frontend on pushes and pull requests."],
    ], [35*mm, 42*mm, 94*mm], small=True
))
story.append(callout("Why Angular and Spring are separate during development", "Angular's development server gives fast browser refresh at port 4200. Spring runs the API at port 8080. proxy.conf.json forwards /api calls so the frontend can use one relative URL.", "blue"))

chapter("4. The exact order to read the files")
story.append(P("Do not begin by reading every file alphabetically. Follow the application's movement from startup to UI to API to database."))
story.append(Diagram("reading", 150))
story.append(numbered([
    "Read <b>README.md</b> for the product goal and commands.",
    "Read <b>frontend/package.json</b>, <b>backend/pom.xml</b>, and <b>application.yml</b> to see dependencies and runtime settings.",
    "Follow browser startup: <b>index.html -> main.ts -> app.config.ts -> app.ts -> app.html</b>.",
    "Read TypeScript contracts: <b>auth.model.ts</b> and <b>help-post.model.ts</b>.",
    "Read browser communication: <b>auth.service.ts</b>, <b>help-post.service.ts</b>, and <b>auth.interceptor.ts</b>.",
    "Follow Java startup: <b>HelpHiveApplication.java -> SecurityConfig.java -> JwtAuthenticationFilter.java</b>.",
    "Follow accounts: <b>AuthController -> AuthService -> AppUserRepository -> AppUser</b>, with <b>JwtService</b> during login.",
    "Follow posts: <b>HelpPostController -> HelpPostService -> HelpPostRepository -> HelpPost</b>.",
    "Read input/output records and <b>GlobalExceptionHandler</b> to understand validation and errors.",
    "Finish with <b>Dockerfile</b>, <b>render.yaml</b>, and <b>ci.yml</b> to understand delivery.",
]))
story.append(callout("Best reading technique", "Pick one user action and keep asking: Which method runs next? What data crosses the boundary? Which class owns the rule? Start with login, then list posts, then create a post.", "yellow"))

section("Feature tracing formula")
story.append(code("""
HTML click or form submit
  -> method in app.ts
  -> Angular service method
  -> auth interceptor adds Bearer token
  -> Spring Security validates token
  -> controller endpoint
  -> service business rule
  -> repository / entity / database
  -> response DTO becomes JSON
  -> Angular subscribe updates a signal
  -> app.html automatically re-renders
"""))

chapter("5. Root files, dependencies, and configuration")
section("README.md")
story.append(P("The human entry point. It explains features, architecture, commands, APIs, deployment, and future ideas. Read it before code because it tells you what behavior the code is supposed to produce."))
section("backend/pom.xml")
story.append(P("Maven's project file. The Spring Boot parent manages compatible dependency versions. Dependencies add web, JPA, validation, actuator, security, H2, PostgreSQL, and tests. The Spring Boot Maven plugin packages an executable JAR."))
story.append(code("""
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
"""))
section("frontend/package.json")
story.append(P("npm's project manifest. dependencies are required in the running application. devDependencies support building and testing. package-lock.json freezes exact transitive versions so local builds, CI, and Docker are reproducible."))
story.append(data_table(
    ["Command", "Meaning"],
    [["npm start", "Angular development server with the /api proxy."],
     ["npm run build", "Optimized production browser bundle."],
     ["npm test -- --watch=false", "One non-interactive unit-test run."],
     ["./mvnw verify", "Compile, run backend tests, and package the JAR."]],
    [53*mm, 118*mm]
))
section("backend/src/main/resources/application.yml")
story.append(P("Spring configuration uses environment variables first and safe development defaults second. Locally, no DATABASE_URL means H2. On Render, the Neon values override H2."))
story.append(code("""
datasource:
  url: ${DATABASE_URL:jdbc:h2:mem:helphive...}
app:
  security:
    jwt-secret: ${JWT_SECRET:local-development-secret...}
    jwt-expiration: ${JWT_EXPIRATION:PT2H}
"""))
story.append(callout("Configuration rule", "Never put a real Neon password or production JWT secret in Git. Render stores those values as environment variables.", "coral"))

chapter("6. Frontend startup and the Angular mental model")
section("Startup chain")
story.append(data_table(
    ["File", "What happens"],
    [
        ["src/index.html", "Browser shell with <app-root>. It does not contain the community UI."],
        ["src/main.ts", "Calls bootstrapApplication(App, appConfig). This creates the root component."],
        ["app.config.ts", "Registers HttpClient, the auth interceptor, router, and global error listeners."],
        ["app.routes.ts", "Empty because this is currently a single-page, single-component application."],
        ["app.ts", "Owns UI state, forms, actions, and calls to frontend services."],
        ["app.html", "Declarative template. It shows the auth gate or community based on signals."],
        ["app.scss", "Component layout, colors, modals, responsive rules, and auth-gate design."],
        ["styles.scss", "Global fonts, color variables, reset rules, and accessibility helper."],
    ], [49*mm, 122*mm]
))
section("What a component is")
story.append(P("The <b>App</b> class is the brain for the root screen. The <b>@Component</b> metadata connects the class to app.html and app.scss. Angular evaluates template expressions against the class."))
story.append(code("""
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App { ... }
"""))
section("Signals: state that redraws the view")
story.append(P("A signal is a value Angular watches. <b>posts.set(newPosts)</b> changes the value; <b>posts()</b> reads it. The template's @if and @for blocks re-evaluate automatically."))
story.append(code("""
readonly posts = signal<HelpPost[]>([]);
readonly loading = signal(true);
readonly resultLabel = computed(
  () => `${this.posts().length} matches`
);
"""))

chapter("7. Angular forms, template, and UI logic")
section("Reactive forms")
story.append(P("FormBuilder creates three typed forms: postForm, loginForm, and registerForm. Validators run in the browser for fast feedback. The backend validates again because browser validation can be bypassed."))
story.append(data_table(
    ["Form", "Important validation", "Submit method"],
    [
        ["registerForm", "Name required; valid email; password 8-72 characters.", "submitAuth() registration branch"],
        ["loginForm", "Valid email and a password value.", "submitAuth() login branch"],
        ["postForm", "Title, 20-800 character description, location, category, type.", "submit()"],
    ], [38*mm, 80*mm, 53*mm]
))
section("Members-only rendering")
story.append(P("The outer template condition is the first UI gate. When authenticated() is false, Angular does not create the header, community board, post cards, or footer. It creates only the auth gate."))
story.append(code("""
@if (auth.authenticated()) {
  <!-- complete community UI -->
}

@if (!auth.authenticated() || authModalOpen()) {
  <!-- account and sign-in gate -->
}
"""))
story.append(callout("UI protection is not enough", "A person can call an API without using your Angular screen. That is why SecurityConfig also requires authentication for /api/**. The backend is the real security boundary.", "coral"))
section("How filtering works")
story.append(P("Search, category, type, and status are signals. Each control changes a signal and calls refresh(). HelpPostService converts non-empty values into HTTP query parameters. The server filters the returned posts."))

chapter("8. Frontend services and HTTP")
section("auth.model.ts and help-post.model.ts")
story.append(P("These interfaces are TypeScript contracts. They document the JSON shape expected from Spring. They do not exist at runtime, but the compiler catches mistakes while you code."))
section("AuthService")
story.append(P("AuthService is provided once for the whole application. Registration calls the API but does not save a session. Login saves the JWT and safe user object. Logout removes both."))
story.append(code("""
login(input: LoginInput): Observable<AuthResponse> {
  return this.http.post<AuthResponse>('/api/auth/login', input)
    .pipe(tap(response => this.save(response)));
}
"""))
story.append(P("The token and user use <b>sessionStorage</b>. They survive page refreshes in the same tab session but are removed when that browser session ends. authenticated is computed from both stored pieces."))
section("authInterceptor")
story.append(P("The interceptor is a central checkpoint for outgoing API calls. It clones each /api request and adds the Authorization header when a token exists. Login and registration are sent without a token when signed out."))
story.append(code("""
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
"""))
section("HelpPostService")
story.append(P("This service contains only HTTP details: paths, methods, query parameters, and response types. It does not decide ownership. Security-sensitive rules live on the server."))

chapter("9. Spring Boot startup and dependency injection")
section("HelpHiveApplication.java")
story.append(P("Java starts in main(). SpringApplication.run launches the embedded server, scans the com.helphive.api package, creates components, configures the database, and registers endpoints."))
story.append(code("""
@SpringBootApplication(
  exclude = UserDetailsServiceAutoConfiguration.class
)
public class HelpHiveApplication {
  public static void main(String[] args) {
    SpringApplication.run(HelpHiveApplication.class, args);
  }
}
"""))
story.append(P("The exclusion prevents Spring from creating an unrelated default development user and password because HelpHive provides its own JWT-based authentication."))
section("Dependency injection")
story.append(P("Classes declare required collaborators in their constructors. Spring creates one suitable object and passes it in. For example, AuthService receives AppUserRepository, PasswordEncoder, and JwtService. This makes responsibilities visible and classes testable."))
story.append(code("""
public AuthService(AppUserRepository repository,
                   PasswordEncoder passwordEncoder,
                   JwtService jwtService) {
  this.repository = repository;
  this.passwordEncoder = passwordEncoder;
  this.jwtService = jwtService;
}
"""))
section("Common annotations")
story.append(data_table(
    ["Annotation", "Meaning"],
    [["@RestController", "Class receives HTTP requests and serializes return values as JSON."],
     ["@Service", "Business-logic component managed by Spring."],
     ["@Entity", "Class maps to a database table."],
     ["@Configuration", "Class supplies application configuration or beans."],
     ["@Bean", "Method return value becomes a managed Spring object."],
     ["@Transactional", "Database work runs as one unit; failures roll back."],
     ["@Valid", "Run Bean Validation on the request body."],
     ["@AuthenticationPrincipal", "Inject the user established by the JWT filter."]],
    [49*mm, 122*mm]
))

chapter("10. Backend layers: controller, service, repository, entity")
story.append(P("The post feature is intentionally layered. Each layer has one type of responsibility."))
story.append(data_table(
    ["Layer", "HelpHive class", "Responsibility"],
    [
        ["Controller", "HelpPostController", "HTTP paths, methods, parameters, status codes, request/response shapes."],
        ["Service", "HelpPostService", "Filtering, ownership, state changes, and transaction boundaries."],
        ["Repository", "HelpPostRepository", "Database CRUD and generated count queries."],
        ["Entity", "HelpPost", "Fields, table mapping, relationships, and timestamps."],
        ["DTO", "HelpPostRequest/Response", "Validated external input and safe external output."],
    ], [35*mm, 50*mm, 86*mm]
))
section("Why not put everything in the controller?")
story.append(P("A controller should translate HTTP into a use case. If database and business logic are mixed there, code becomes harder to test and reuse. Services also provide a clear place for authorization rules such as requireOwner()."))
section("Repository magic")
story.append(P("JpaRepository already supplies save, findById, findAll, count, and delete. Spring reads method names such as countByStatus and generates SQL at runtime."))
story.append(code("""
public interface HelpPostRepository
    extends JpaRepository<HelpPost, Long> {
  long countByStatus(PostStatus status);
  long countByType(PostType type);
}
"""))

chapter("11. Database design and JPA")
story.append(Diagram("database", 174))
section("AppUser entity")
story.append(P("@Entity maps AppUser to app_users. Email has both an application duplicate check and a unique database constraint. passwordHash stores BCrypt output, never the original password. UserRole is saved as readable text such as MEMBER."))
section("HelpPost entity")
story.append(P("HelpPost maps to help_posts. @ManyToOne means many posts may point to one owner. The owner relation is nullable only so the original seeded demo posts can remain. New posts always receive the signed-in AppUser as owner."))
story.append(data_table(
    ["Database column", "Source", "Rule"],
    [["title", "HelpPostRequest", "Required, maximum 90."],
     ["description", "HelpPostRequest", "Required, 20-800."],
     ["author_name", "Signed-in AppUser.name", "Client cannot impersonate another author."],
     ["contact", "Signed-in AppUser.email", "Client cannot submit a different contact."],
     ["owner_id", "JWT user -> AppUser", "Used for edit/delete/status authorization."],
     ["status", "Default OPEN", "Moves to IN_PROGRESS or COMPLETED."],
     ["created_at / updated_at", "JPA lifecycle callbacks", "Set automatically."]],
    [45*mm, 55*mm, 71*mm], small=True
))
section("H2 versus Neon PostgreSQL")
story.append(data_table(
    ["Environment", "Database", "Persistence"],
    [["Local normal run", "In-memory H2", "Cleared when the backend process stops."],
     ["Automated tests", "Separate in-memory H2", "Created and dropped for the test context."],
     ["Hosted Render app", "Neon PostgreSQL", "Survives Render sleep and redeploys."]],
    [45*mm, 52*mm, 74*mm]
))
story.append(callout("Prototype choice", "hibernate.ddl-auto=update is convenient for this learning project. Mature production systems usually use versioned migrations such as Flyway so schema changes are reviewed and repeatable.", "yellow"))

chapter("12. Registration from start to finish")
story.append(Diagram("register", 170))
section("Exact code path")
story.append(numbered([
    "app.html submits registerForm to <b>App.submitAuth()</b>.",
    "Angular validators reject missing name, bad email, or a password outside 8-72 characters.",
    "AuthService sends <b>POST /api/auth/register</b> with JSON.",
    "SecurityConfig permits this endpoint without a JWT.",
    "AuthController validates RegisterRequest and calls AuthService.register().",
    "AuthService trims and lowercases email, rejects duplicates, and BCrypt-hashes the password.",
    "AppUserRepository.save() inserts into app_users inside a transaction.",
    "The API returns UserResponse only - no password hash and no JWT.",
    "Angular switches to the sign-in tab and pre-fills the email. Community access is still locked.",
]))
story.append(code("""
POST /api/auth/register
{
  "name": "Alex Kim",
  "email": "alex@example.com",
  "password": "strong-pass-123"
}

201 Created
{
  "id": 7,
  "name": "Alex Kim",
  "email": "alex@example.com",
  "role": "MEMBER"
}
"""))
story.append(callout("Why registration does not log in", "The project deliberately requires two steps: create the account, then prove the credentials through the login endpoint before receiving access.", "blue"))

chapter("13. Login and JWT creation")
story.append(Diagram("login", 170))
section("Password verification")
story.append(P("The database stores a salted BCrypt hash. passwordEncoder.matches(rawPassword, storedHash) performs the check. The raw password is not saved and cannot be recovered from the hash."))
section("JWT contents")
story.append(P("JwtService creates a compact three-part token using HMAC-SHA256 (HS256). The header and payload are Base64URL encoded. The signature is calculated with JWT_SECRET."))
story.append(data_table(
    ["Claim", "Meaning"],
    [["sub", "Subject: normalized email."], ["uid", "Database user ID."],
     ["name", "Display name."], ["role", "MEMBER or ADMIN."],
     ["iat", "Issued-at Unix time."], ["exp", "Expiration Unix time; two hours by default."]],
    [35*mm, 136*mm]
))
story.append(code("""
POST /api/auth/login
{ "email": "alex@example.com", "password": "strong-pass-123" }

200 OK
{
  "token": "eyJ...signed-token...",
  "user": { "id": 7, "name": "Alex Kim",
            "email": "alex@example.com", "role": "MEMBER" }
}
"""))
story.append(callout("JWT is signed, not encrypted", "A JWT payload can be decoded by its holder. Never put passwords or secrets inside it. The signature prevents undetected changes; HTTPS protects it while travelling over the network.", "coral"))

chapter("14. Every authenticated request")
story.append(Diagram("request", 185))
section("JwtAuthenticationFilter")
story.append(P("This OncePerRequestFilter runs once for each request. It reads the Authorization header, removes 'Bearer ', validates the signature and expiration through JwtService, creates an AuthenticatedUser, and stores authentication in Spring's SecurityContext."))
story.append(code("""
String header = request.getHeader(HttpHeaders.AUTHORIZATION);
AuthenticatedUser user = jwtService.parse(header.substring(7));
SecurityContextHolder.getContext().setAuthentication(authentication);
"""))
section("SecurityConfig rules")
story.append(code("""
register, login, health  -> permitAll()
/api/**                 -> authenticated()
static Angular files    -> permitAll()
"""))
story.append(P("If no valid authentication exists for a protected API request, Spring returns JSON with HTTP 401. If a signed-in member tries to alter another member's post, the service throws AccessDeniedException and returns HTTP 403."))
section("401 versus 403")
story.append(data_table(
    ["Status", "Meaning", "Example"],
    [["401 Unauthorized", "Identity missing or invalid.", "No token, malformed token, or expired token."],
     ["403 Forbidden", "Identity is known but action is not allowed.", "Member deletes another member's post."]],
    [35*mm, 60*mm, 76*mm]
))

chapter("15. Member-only access, ownership, and privacy")
section("Defense in depth")
story.append(data_table(
    ["Layer", "Protection"],
    [["Angular template", "Does not render community UI while signed out."],
     ["App.refresh()", "Does not request posts or stats while signed out; clears data on logout/401."],
     ["Interceptor", "Adds JWT to API requests."],
     ["Spring Security", "Rejects every /api/** request except register/login without authentication."],
     ["HelpPostService", "Checks owner ID before update, status change, or delete."],
     ["Database", "Unique email and foreign-key relationship protect integrity."]],
    [45*mm, 126*mm]
))
section("Ownership is based on server identity")
story.append(P("A post request does not include authorName, contact, or ownerId. During creation, HelpPostService loads the AppUser identified by the signed JWT and copies the user's name and email. This prevents a client from claiming to be someone else."))
story.append(code("""
AppUser owner = requireUser(currentUser.id());
post.setOwner(owner);
post.setAuthorName(owner.getName());
post.setContact(owner.getEmail());
"""))
section("Owner check")
story.append(P("requireOwner compares help_posts.owner_id with the authenticated user's ID. The UI also hides owner buttons, but the server comparison is what provides security."))
story.append(code("""
if (post.getOwner() == null ||
    !post.getOwner().getId().equals(currentUser.id())) {
  throw new AccessDeniedException(
    "Only the post owner can make this change");
}
"""))
story.append(callout("Demo-post exception", "Seeded posts have no AppUser owner. They are visible to members but remain read-only because requireOwner rejects owner == null.", "yellow"))

chapter("16. Post CRUD and business logic")
story.append(data_table(
    ["User action", "HTTP request", "Controller -> service"],
    [["Load/filter board", "GET /api/posts?search=...", "findAll -> findAll"],
     ["Open one post", "GET /api/posts/{id}", "findById -> findById"],
     ["Load counters", "GET /api/posts/stats", "stats -> stats"],
     ["Create", "POST /api/posts", "create -> create"],
     ["Edit details", "PUT /api/posts/{id}", "update -> update + requireOwner"],
     ["Advance status", "PATCH /api/posts/{id}/status", "updateStatus -> requireOwner"],
     ["Delete", "DELETE /api/posts/{id}", "delete -> requireOwner"]],
    [45*mm, 61*mm, 65*mm]
))
section("Create post flow")
story.append(numbered([
    "User completes postForm; Angular validates it.",
    "HelpPostService on the frontend sends the input JSON with the JWT added by the interceptor.",
    "Spring Security establishes currentUser.",
    "HelpPostController validates HelpPostRequest.",
    "The backend service copies allowed fields, attaches the real owner identity, and saves.",
    "The controller returns 201 Created and a Location header.",
    "Angular closes the modal, displays a toast, reloads posts and statistics, and the template updates.",
]))
section("Filtering implementation")
story.append(P("The current implementation loads all posts sorted newest-first and filters in Java streams. That is easy to understand and fine for a small portfolio dataset. For thousands of posts, move filters and pagination into repository queries so PostgreSQL does the work."))
section("Status state machine")
story.append(code("""
OPEN  ->  IN_PROGRESS  ->  COMPLETED
"""))
story.append(P("The UI advances only forward. The API currently accepts any valid PostStatus value, so stricter transition validation would be a useful future exercise."))

chapter("17. Validation, errors, and response DTOs")
section("Two validation layers")
story.append(P("Angular validation improves usability. Jakarta Bean Validation protects the server. Never depend only on frontend validation because any HTTP client can bypass the browser UI."))
story.append(data_table(
    ["Exception / condition", "HTTP status", "Handled by"],
    [["Invalid request fields", "400", "GlobalExceptionHandler.handleValidation"],
     ["Bad email/password", "401", "handleBadCredentials"],
     ["Duplicate account", "409", "handleConflict"],
     ["Post/user not found", "404", "handleNotFound"],
     ["Not the post owner", "403", "handleAccessDenied"],
     ["Unexpected exception", "500", "Generic safe error; internal details are not exposed."]],
    [57*mm, 30*mm, 84*mm]
))
section("Why request and response records exist")
story.append(P("Entities represent stored data. API records represent allowed external data. RegisterRequest accepts a password, but UserResponse never returns passwordHash. HelpPostRequest omits author and owner fields, while HelpPostResponse adds computed ownedByCurrentUser."))
story.append(callout("A subtle privacy point", "HelpPostResponse hides contact when currentUserId is null. With the current members-only API, a valid user is always present for post calls. Keeping this output rule adds another layer of protection if public reads are reintroduced later.", "blue"))

chapter("18. Run and understand it locally on Windows")
section("Terminal 1 - backend")
story.append(code("""
cd /c/Users/gujju/Documents/Codex/2026-08-13/i/outputs/github-projects/helphive/backend
cmd.exe /c mvnw.cmd spring-boot:run
"""))
story.append(P("Wait for 'Started HelpHiveApplication'. Spring runs at http://localhost:8080 and uses in-memory H2 unless database environment variables are set."))
section("Terminal 2 - frontend")
story.append(code("""
cd /c/Users/gujju/Documents/Codex/2026-08-13/i/outputs/github-projects/helphive/frontend
npm install
npm start
"""))
story.append(P("Open http://localhost:4200. proxy.conf.json forwards /api to port 8080. Accounts created locally disappear after the backend stops because H2 is in memory."))
section("A deliberate learning session")
story.append(numbered([
    "Open browser Developer Tools -> Network.",
    "Create an account and inspect POST /api/auth/register. Notice there is no token.",
    "Sign in and inspect POST /api/auth/login. Find token and user in the response.",
    "Open Application -> Session Storage and find helphive_token and helphive_user.",
    "Load the board. Inspect GET /api/posts and its Authorization header.",
    "Create a post. Compare the request JSON with the response JSON; owner fields come from the server.",
    "Sign out. Confirm the community disappears and protected API calls return 401 without the token.",
]))
story.append(callout("Do not paste tokens publicly", "A JWT is temporary login authority. Treat it like a password while it is valid.", "coral"))

chapter("19. Production build: Docker, Render, and Neon")
story.append(Diagram("deploy", 145))
section("Dockerfile stages")
story.append(data_table(
    ["Stage", "Work"],
    [["1. frontend-build", "Node 24 runs npm ci and ng build."],
     ["2. backend-build", "Maven downloads dependencies, copies Angular browser files into Spring static resources, and packages the JAR."],
     ["3. runtime", "Small Java 21 JRE image runs as a non-root spring user."]],
    [45*mm, 126*mm]
))
story.append(P("The result is one process and one public URL. Spring serves index.html, hashed JavaScript/CSS files, and /api endpoints. SpaForwardController forwards non-file browser routes to index.html."))
section("render.yaml")
story.append(data_table(
    ["Setting", "Purpose"],
    [["runtime: docker", "Build using the repository Dockerfile."],
     ["plan: free", "Use Render's free web-service instance."],
     ["healthCheckPath", "Render checks /actuator/health."],
     ["autoDeployTrigger: commit", "Deploy after commits to the connected branch."],
     ["DATABASE_* sync:false", "Secret Neon connection values entered in Render."],
     ["JWT_SECRET generateValue:true", "Render generates and stores a random signing secret."],
     ["JAVA_TOOL_OPTIONS", "Limits Java heap as a percentage of container memory."]],
    [58*mm, 113*mm]
))
chapter("20. GitHub Actions, tests, and verification")
section("Continuous integration")
story.append(P(".github/workflows/ci.yml runs on pushes to main and pull requests. The backend job installs Java 21 and runs Maven verify. The frontend job installs Node 24, runs npm ci, unit tests, and the production build."))
section("Backend integration test")
story.append(P("HelpPostControllerTest starts the Spring context with a test H2 database and uses MockMvc to make HTTP-like requests without opening a real network port. Its four scenarios cover CRUD, validation, authentication, ownership, registration, login, and duplicate accounts."))
story.append(data_table(
    ["Test concept", "Why it matters"],
    [["Anonymous GET/POST -> 401", "Proves community data is actually members-only."],
     ["Register then login", "Proves the two-step access requirement."],
     ["Owner versus other member", "Proves 403 ownership enforcement."],
     ["Invalid fields", "Proves server validation produces useful errors."],
     ["CRUD and status", "Proves normal feature behavior end to end."]],
    [60*mm, 111*mm]
))
section("Frontend tests")
story.append(P("app.spec.ts verifies application creation, branding, and the anonymous account gate. auth.service.spec.ts verifies that registration does not create a session and logout removes session data. Vitest and jsdom provide the test environment."))
section("What the build checks do not prove")
story.append(P("Passing tests cannot prove the absence of every bug or security issue. Manual browser testing, dependency updates, rate limiting, monitoring, backups, and security review still matter."))

chapter("21. Debugging map")
story.append(data_table(
    ["Symptom", "Start here", "Likely area"],
    [["Blank page", "Browser Console", "Angular compile/runtime error or missing bundle."],
     ["Sign-in rejected", "Network response + Render logs", "Credentials, user row, BCrypt match, auth error."],
     ["401 after login", "Request Authorization header", "Missing/expired token, JWT secret changed."],
     ["403 on edit", "Response body + owner IDs", "Signed-in user does not own the post or demo owner is null."],
     ["Posts do not load", "GET /api/posts in Network", "Backend sleeping, 401, database connection, server error."],
     ["Local Angular API error", "proxy.conf.json + backend terminal", "Backend not running on port 8080."],
     ["Render deploy fails", "Deploy logs from first error", "Docker build, Java/Node compile, missing environment variable."],
     ["No users in Neon", "Branch/database selection", "Wrong branch, deployment not live, or account created only in local H2."],
     ["Data disappears locally", "application.yml datasource", "Expected H2 in-memory behavior."],
    ], [43*mm, 56*mm, 72*mm], small=True
))
section("Read errors from the bottom up")
story.append(P("In Java stack traces, find the first 'Caused by' related to com.helphive. In Angular, read the first red error and its file/line. In Render, find the earliest failing build command instead of only the final 'deploy failed' message."))

chapter("22. A seven-day learning plan")
story.append(data_table(
    ["Day", "Read", "Do"],
    [["1", "Chapters 1-5; startup/config files", "Run both servers and identify the two ports."],
     ["2", "app.ts, app.html, models", "Change one label and add one category icon."],
     ["3", "Angular services/interceptor", "Inspect requests in browser Network tools."],
     ["4", "Spring controllers and DTOs", "Add a harmless GET endpoint or response field."],
     ["5", "Services, repositories, entities", "Trace create post from request to database row."],
     ["6", "Security, registration, login, JWT", "Decode a test JWT payload and identify its claims."],
     ["7", "Tests, Docker, Render", "Run checks, commit a small change, and observe CI/deploy."],
    ], [20*mm, 71*mm, 80*mm]
))
section("Use breakpoints instead of only reading")
story.append(P("In a Java IDE, place breakpoints in AuthController.login, AuthService.login, JwtService.issue, JwtAuthenticationFilter, HelpPostController.findAll, and HelpPostService.create. In browser tools, use Network and Sources. Watching values move is faster than guessing."))

chapter("23. Safe exercises that make the code yours")
story.append(data_table(
    ["Exercise", "Files to change", "What you learn"],
    [["Add a FOOD category", "Category.java, help-post.model.ts, app.ts", "Keep Java and TypeScript contracts synchronized."],
     ["Add post urgency", "Entity, request/response, model, form/template", "Full-stack field lifecycle."],
     ["Add My Posts filter", "App state, client query, service/repository query", "Identity-aware filtering."],
     ["Validate status transitions", "HelpPostService + tests", "Business rules and test-driven changes."],
     ["Add pagination", "Repository/service/controller + Angular", "Scalable database querying."],
     ["Add email verification", "User fields, token/mail service, auth UI", "Account lifecycle and security."],
     ["Move JWT to HttpOnly cookie", "Security config, controller, Angular auth", "Stronger browser token protection."],
     ["Add Flyway migrations", "pom.xml + db/migration files", "Production schema management."],
    ], [42*mm, 74*mm, 55*mm], small=True
))
story.append(callout("Change one vertical slice at a time", "For a new field, update database/entity, backend DTO/service, frontend interface/form/template, tests, then documentation. Build after each small step.", "green"))

chapter("24. Complete source-file reference")
story.append(P("This catalog tells you why each important file exists. Use it after following the reading order, not as the first learning step."))
section("Root and delivery")
story.append(data_table(
    ["File", "Purpose"],
    [["README.md", "Project overview, API, local commands, deployment, and future work."],
     ["Dockerfile", "Three-stage production build and non-root Java runtime."],
     ["render.yaml", "Render service, health check, auto-deploy, database secrets, JWT secret."],
     [".github/workflows/ci.yml", "Backend and frontend CI jobs."],
     [".gitignore / .dockerignore", "Prevent generated, local, and unnecessary files from being committed or copied."],
     ["LICENSE", "MIT permission terms."]],
    [65*mm, 106*mm], small=True
))
section("Frontend")
story.append(data_table(
    ["File", "Purpose"],
    [["package.json / package-lock.json", "Scripts, direct packages, and frozen dependency tree."],
     ["angular.json", "Angular build, serve, test, assets, styles, and bundle budgets."],
     ["proxy.conf.json", "Local /api forwarding to Spring port 8080."],
     ["src/index.html", "Browser document and app-root mount point."],
     ["src/main.ts", "Bootstraps the standalone App component."],
     ["src/styles.scss", "Global design tokens and base element rules."],
     ["app.config.ts", "Registers HttpClient/interceptor/router."],
     ["app.routes.ts", "Currently empty route list."],
     ["app.ts", "Root UI state, forms, user actions, API subscriptions."],
     ["app.html", "Auth gate, community page, filters, cards, and modals."],
     ["app.scss", "All root component visual and responsive styling."],
     ["auth.model.ts", "Account input/output TypeScript interfaces."],
     ["auth.service.ts", "Register, login, logout, token/user session storage."],
     ["auth.interceptor.ts", "Adds JWT Authorization header to API calls."],
     ["help-post.model.ts", "Post enums, DTO interfaces, statistics shape."],
     ["help-post.service.ts", "Post HTTP methods and filter parameters."],
     ["*.spec.ts", "Angular unit tests."]],
    [62*mm, 109*mm], small=True
))
section("Backend")
story.append(data_table(
    ["File / group", "Purpose"],
    [["HelpHiveApplication.java", "Main method and Spring Boot startup."],
     ["application.yml", "Database, port, actuator, CORS, JWT configuration."],
     ["auth/*Request, *Response", "Validated auth inputs and safe outputs."],
     ["AuthController.java", "Register, login, and current-user endpoints."],
     ["AuthService.java", "Account creation, email normalization, BCrypt verification, JWT issue."],
     ["JwtService.java", "HS256 token creation, signature verification, expiration parsing."],
     ["AuthenticatedUser.java", "Identity stored in Spring SecurityContext."],
     ["AppUser.java", "app_users entity."],
     ["AppUserRepository.java", "User lookup and duplicate check."],
     ["UserRole.java", "MEMBER and future ADMIN values."],
     ["SecurityConfig.java", "Stateless rules, BCrypt bean, 401/403 JSON handlers."],
     ["JwtAuthenticationFilter.java", "Turns Bearer token into authenticated request identity."],
     ["HelpPostController.java", "REST endpoints for posts and statistics."],
     ["HelpPostService.java", "Filtering, CRUD, owner rules, statistics."],
     ["HelpPostRepository.java", "Post persistence and count queries."],
     ["HelpPost.java", "help_posts entity and user relationship."],
     ["HelpPostRequest/Response", "Validated post input and safe/computed output."],
     ["Category/PostType/PostStatus", "Allowed enum values."],
     ["StatusUpdateRequest/PostStats", "Small endpoint-specific records."],
     ["GlobalExceptionHandler.java", "Consistent API errors."],
     ["ApiError + custom exceptions", "Error response shape and named failure types."],
     ["DemoDataConfig.java", "Adds six ownerless posts to an empty non-test database."],
     ["WebConfig.java", "Development CORS rules."],
     ["SpaForwardController.java", "Forwards browser routes to Angular index.html."],
     ["HelpPostControllerTest.java", "Spring integration/security tests."],
     ["test application.yml", "Isolated create-drop H2 database for tests."]],
    [65*mm, 106*mm], small=True
))

chapter("25. API quick reference")
story.append(data_table(
    ["Method", "Path", "Access", "Success"],
    [["POST", "/api/auth/register", "Public", "201 + UserResponse"],
     ["POST", "/api/auth/login", "Public", "200 + JWT/user"],
     ["GET", "/api/auth/me", "Member", "200 + user"],
     ["GET", "/api/posts", "Member", "200 + post array"],
     ["GET", "/api/posts/{id}", "Member", "200 + post"],
     ["GET", "/api/posts/stats", "Member", "200 + counts"],
     ["POST", "/api/posts", "Member", "201 + created post"],
     ["PUT", "/api/posts/{id}", "Owner", "200 + updated post"],
     ["PATCH", "/api/posts/{id}/status", "Owner", "200 + updated post"],
     ["DELETE", "/api/posts/{id}", "Owner", "204 no content"],
     ["GET", "/actuator/health", "Public", "200 when healthy"]],
    [20*mm, 70*mm, 29*mm, 52*mm], small=True
))
section("Useful Neon queries")
story.append(code("""
-- Safe user list: deliberately excludes password_hash
SELECT id, name, email, role, created_at
FROM app_users
ORDER BY created_at DESC;

-- Posts with owner identity
SELECT p.id, p.title, p.status, u.email AS owner_email
FROM help_posts p
LEFT JOIN app_users u ON u.id = p.owner_id
ORDER BY p.created_at DESC;
"""))

chapter("26. Final mental model and glossary")
story.append(P("When you feel lost, return to this single sentence:"))
story.append(callout("The complete system in one sentence", "Angular turns user actions into authenticated HTTP requests; Spring Security identifies the member; controllers receive the request; services apply rules; repositories persist entities in PostgreSQL; DTOs return safe JSON; signals redraw the Angular interface.", "green"))
section("Compact glossary")
story.append(data_table(
    ["Term", "Remember this"],
    [["Component", "Angular screen logic plus its template and style."],
     ["Signal", "Watched UI state."],
     ["Observable", "Future asynchronous values from HttpClient."],
     ["Interceptor", "Central modifier for outgoing HTTP requests."],
     ["Endpoint", "One HTTP method and path handled by a controller."],
     ["Bean", "Object created and managed by Spring."],
     ["Transaction", "Database work that succeeds or rolls back as a unit."],
     ["Entity", "Java object mapped to a table row."],
     ["Repository", "Data-access interface."],
     ["DTO", "Purpose-built API data shape."],
     ["JWT", "Signed, expiring identity token."],
     ["401", "Sign in is missing or invalid."],
     ["403", "Signed in, but action is not permitted."],
     ["CORS", "Browser rule for requests between different origins."],
     ["Environment variable", "Secret or setting supplied outside source code."]],
    [42*mm, 129*mm], small=True
))
section("You now know where to begin")
story.append(numbered([
    "Open app.ts and follow submitAuth() through AuthService to AuthController and AuthService in Java.",
    "Then follow refresh() through HelpPostService to HelpPostController and HelpPostService.",
    "Finally follow submit() through create(), the owner assignment, repository.save(), and the returned response.",
]))
story.append(P("Do not try to remember every line. Learn the path data follows, the responsibility of each layer, and the security rule enforced at each boundary. The individual syntax becomes much easier after the architecture is familiar."))


doc = GuideDocTemplate(
    str(OUT), pagesize=A4,
    title="HelpHive Complete Beginner Code Guide",
    author="HelpHive project documentation",
    subject="Beginner-first architecture and code walkthrough",
    creator="Codex",
)
doc.multiBuild(story)
print(OUT)
