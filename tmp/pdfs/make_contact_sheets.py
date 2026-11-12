from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent
pages = sorted((root / "rendered_v5").glob("page-*.png"), key=lambda p: int(p.stem.split("-")[-1]))
out = root / "contact_sheets_v5"
out.mkdir(exist_ok=True)
font = ImageFont.load_default()

for sheet_index in range((len(pages) + 7) // 8):
    group = pages[sheet_index * 8:(sheet_index + 1) * 8]
    canvas = Image.new("RGB", (1120, 800), "#d9dedb")
    draw = ImageDraw.Draw(canvas)
    for index, path in enumerate(group):
        page = Image.open(path).convert("RGB")
        page.thumbnail((260, 350))
        col, row = index % 4, index // 4
        x, y = 15 + col * 276, 30 + row * 385
        canvas.paste(page, (x, y))
        draw.text((x, y - 18), f"Page {sheet_index * 8 + index + 1}", fill="#173b33", font=font)
    canvas.save(out / f"sheet-{sheet_index + 1}.png")
