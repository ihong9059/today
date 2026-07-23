import sys
import numpy as np
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
long_px = int(sys.argv[3]) if len(sys.argv) > 3 else 24000  # target px on long side
dpi = 300

doc = ezdxf.readfile(src)
msp = doc.modelspace()

# robust tight bbox: collect per-entity centers, drop far outliers
cache = bbox.Cache()
mins = []
maxs = []
for e in msp:
    try:
        b = bbox.extents([e], fast=True, cache=cache)
        if b.has_data:
            mins.append((b.extmin.x, b.extmin.y))
            maxs.append((b.extmax.x, b.extmax.y))
    except Exception:
        pass

mins = np.array(mins)
maxs = np.array(maxs)
cx = (mins[:, 0] + maxs[:, 0]) / 2
cy = (mins[:, 1] + maxs[:, 1]) / 2

# keep entities within 2nd-98th percentile of centers (drops stray points)
def mask(a):
    lo, hi = np.percentile(a, [1, 99])
    return (a >= lo) & (a <= hi)

keep = mask(cx) & mask(cy)
xmin = mins[keep, 0].min(); ymin = mins[keep, 1].min()
xmax = maxs[keep, 0].max(); ymax = maxs[keep, 1].max()
w = xmax - xmin; h = ymax - ymin
pad = 0.02
mx, my = w * pad, h * pad
aspect = h / w

if aspect <= 1:
    width_in = long_px / dpi
    height_in = width_in * aspect
else:
    height_in = long_px / dpi
    width_in = height_in / aspect

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
print(f"saved {out}  ~{int(width_in*dpi)}x{int(height_in*dpi)} px  aspect={aspect:.3f}  tight bbox w={w:.0f} h={h:.0f}")
