
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

 import "./InventoryDashboard.css";

const API = "https://server-app-xite.onrender.com";

export default function InventoryDashboard({ vid }) {
  const [items, setItems] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const [query, setQuery] = useState("");
  const [thresholdFilter, setThresholdFilter] = useState("all");

  const [page, setPage] = useState(1);
  const perPage = 15;

  const [editing, setEditing] = useState(null);
  const [editDelta, setEditDelta] = useState(0);
  const [editMode, setEditMode] = useState("inc");
  const [actionLoading, setActionLoading] = useState(false);

  /* ================= FETCH INVENTORY ================= */

  const fetchInventory = useCallback(async () => {
    if (!vid) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API}/inventory/inventorybyvendor/${vid}`
      );
      if (!res.ok) throw new Error();

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setLastSync(new Date());
    } catch {
      setError("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }, [vid]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  /* AUTO REFRESH */
  useEffect(() => {
    const id = setInterval(fetchInventory, 30000);
    return () => clearInterval(id);
  }, [fetchInventory]);

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API}/product/showproduct`);
        if (!res.ok) return;

        const products = await res.json();
        const map = {};

        products.forEach((p) => {
          map[String(p.pid)] = p; // 🔥 IMPORTANT FIX
        });

        setProductMap(map);
      } catch {}
    }

    fetchProducts();
  }, []);

  /* ================= FILTERING ================= */

  const filtered = useMemo(() => {
    let arr = [...items];

    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (i) =>
          String(i.pid).includes(q) ||
          (productMap[String(i.pid)]?.pname || "")
            .toLowerCase()
            .includes(q)
      );
    }

    if (thresholdFilter === "low") {
      arr = arr.filter(
        (i) => i.stock <= (i.threshold ?? 5)
      );
    }

    if (thresholdFilter === "ok") {
      arr = arr.filter(
        (i) => i.stock > (i.threshold ?? 5)
      );
    }

    return arr;
  }, [items, query, thresholdFilter, productMap]);

  useEffect(() => {
    setPage(1);
  }, [query, thresholdFilter]);

  const pages = Math.max(
    1,
    Math.ceil(filtered.length / perPage)
  );

  const pageItems = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= ACTIONS ================= */

  function openEdit(inv) {
    setEditing(inv);
    setEditDelta(0);
    setEditMode("inc");
  }

  async function submitEdit() {
    setActionLoading(true);

    try {
      const payload =
        editMode === "set"
          ? {
              pid: editing.pid,
              vid: editing.vid,
              mode: "set",
              stock: Number(editDelta),
            }
          : {
              pid: editing.pid,
              vid: editing.vid,
              mode: "inc",
              delta: Number(editDelta),
            };

      const res = await fetch(
        `${API}/inventory/managestock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      const updated = await res.json();
      const inv = updated.inventory || updated;

      setItems((prev) =>
        prev.map((i) =>
          i.pid === inv.pid && i.vid === inv.vid
            ? inv
            : i
        )
      );

      setEditing(null);
    } catch {
      alert("Update failed");
    } finally {
      setActionLoading(false);
    }
  }

  async function doDelete(inv) {
    if (
      !window.confirm(
        `Delete inventory PID ${inv.pid}?`
      )
    )
      return;

    try {
      const res = await fetch(
        `${API}/inventory/deletestock/${inv.pid}/vendor/${inv.vid}`,
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error();

      setItems((prev) =>
        prev.filter(
          (i) =>
            !(i.pid === inv.pid && i.vid === inv.vid)
        )
      );
    } catch {
      alert("Delete failed");
    }
  }

  /* ================= UI ================= */

  return (
    <div className="inv-container">
      <div className="inv-header">
        <h2>Product Stock Inventory</h2>
        <div className="inv-header-actions">
          <button onClick={fetchInventory}>
            Refresh
          </button>
          {lastSync && (
            <span className="inv-sync">
              Synced{" "}
              {lastSync.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <div className="inv-filters">
        <input
          placeholder="Search product"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        <select
          value={thresholdFilter}
          onChange={(e) =>
            setThresholdFilter(e.target.value)
          }
        >
          <option value="all">All</option>
          <option value="low">Low stock</option>
          <option value="ok">
            Above threshold
          </option>
        </select>
      </div>

      <div className="inv-table">
        {loading && (
          <div className="inv-loading">
            Loading...
          </div>
        )}

        {!loading && pageItems.length === 0 && (
          <div className="inv-empty">
            No inventory found
          </div>
        )}

        {pageItems.map((inv) => {
          const product =
            productMap[String(inv.pid)];
          const low =
            inv.stock <= (inv.threshold ?? 5);

          return (
            <div
              className="inv-row"
              key={`${inv.pid}-${inv.vid}`}
            >
              <div className="inv-product">
                {product?.ppicname && (
                  <img
                    src={`${API}/product/getproductimage/${product.ppicname}`}
                    alt=""
                  />
                )}
                <div>
                  <div className="inv-name">
                    {product?.pname ||
                      `Product ${inv.pid}`}
                  </div>
                  <div className="inv-pid">
                    PID: {inv.pid}
                  </div>
                </div>
              </div>

              <div className="inv-stock">
                {inv.stock}
                {low && (
                  <span className="inv-low">
                    Low
                  </span>
                )}
              </div>

              <div className="inv-actions">
                <button
                  onClick={() => openEdit(inv)}
                >
                  Edit
                </button>
                <button
                  onClick={() => doDelete(inv)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="inv-pagination">
        <button
          onClick={() =>
            setPage((p) =>
              Math.max(1, p - 1)
            )
          }
        >
          Prev
        </button>
        <span>
          {page} / {pages}
        </span>
        <button
          onClick={() =>
            setPage((p) =>
              Math.min(pages, p + 1)
            )
          }
        >
          Next
        </button>
      </div>

      {editing && (
        <div className="inv-modal">
          <div className="inv-modal-box">
            <h3>
              Edit Stock (PID {editing.pid})
            </h3>

            <select
              value={editMode}
              onChange={(e) =>
                setEditMode(e.target.value)
              }
            >
              <option value="inc">
                Increment
              </option>
              <option value="set">
                Set Stock
              </option>
            </select>

            <input
              type="number"
              value={editDelta}
              onChange={(e) =>
                setEditDelta(
                  Number(e.target.value)
                )
              }
            />

            <div className="inv-modal-actions">
              <button
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                onClick={submitEdit}
                disabled={actionLoading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="inv-error">
          {error}
        </div>
      )}
    </div>
  );
}
