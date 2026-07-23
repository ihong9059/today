import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import ezdxf
from ezdxf import bbox
from ezdxf.addons.drawing import RenderContext, Frontend
from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
from ezdxf.addons.drawing.config import Configuration

src = sys.argv[1]
out = sys.argv[2]
width_in = float(sys.argv[3]) if len(sys.argv) > 3 else 48.0   # inches (long side)
dpi = int(sys.argv[4]) if len(sys.argv) > 4 else 500
pad = 0.02  # 2% margin

doc = ezdxf.readfile(src)
msp = doc.modelspace()

b = bbox.extents(msp, fast=True)
xmin, ymin = b.extmin.x, b.extmin.y
xmax, ymax = b.extmax.x, b.extmax.y
w = xmax - xmin
h = ymax - ymin
mx, my = w * pad, h * pad
aspect = h / w

height_in = max(width_in * aspect, 3.0)

fig = plt.figure(figsize=(width_in, height_in), dpi=dpi)
ax = fig.add_axes([0, 0, 1, 1])
ax.set_axis_off()
ax.set_facecolor("black")
fig.patch.set_facecolor("black")

ctx = RenderContext(doc)
backend = MatplotlibBackend(ax)
Frontend(ctx, backend, config=Configuration()).draw_layout(msp, finalize=False)

ax.set_xlim(xmin - mx, xmax + mx)
ax.set_ylim(ymin - my, ymax + my)
ax.set_aspect("equal")

fig.savefig(out, dpi=dpi, facecolor="black")
print(f"saved {out} @ {dpi}dpi  {width_in:.0f}x{height_in:.1f} in  (~{int(width_in*dpi)}x{int(height_in*dpi)} px)  aspect={aspect:.3f}")
