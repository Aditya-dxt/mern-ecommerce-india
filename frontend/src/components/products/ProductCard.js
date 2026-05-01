"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineHeart,
  HiHeart,
  HiStar,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

const descriptions = {
  Nike: "Engineered for performance and style. Features responsive cushioning, breathable mesh upper, and iconic Nike design language for all-day comfort.",
  Adidas:
    "Built with Boost technology for unmatched energy return. Primeknit upper adapts to your foot shape for a glove-like fit and premium feel.",
  Jordan:
    "A timeless icon reimagined. Premium leather construction, encapsulated Air cushioning, and the unmistakable Jumpman — heritage meets innovation.",
  "New Balance":
    "Handcrafted with premium materials. Fresh Foam midsole delivers plush cushioning while the suede/mesh upper provides classic sophistication.",
  Puma: "Bold design meets cutting-edge technology. Nitro foam cushioning and a striking silhouette that stands out on and off the track.",
  Converse:
    "An enduring classic, reinvented. Canvas upper with OrthoLite insole for modern comfort while maintaining the original authentic style.",
};

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const [wishlisted, setWishlisted] = useState(
    user?.wishlist?.some((w) => (w._id || w) === product._id) || false,
  );

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please login first");
      return;
    }
    try {
      if (wishlisted) {
        await api.delete(`/wishlist/${product._id}`);
        setWishlisted(false);
      } else {
        await api.post(`/wishlist/${product._id}`);
        setWishlisted(true);
      }
    } catch {
      /* ignore */
    }
  };

  const description =
    product.description ||
    descriptions[product.brand] ||
    "Premium quality sneakers crafted with cutting-edge technology and timeless design. Built for comfort, performance, and unmatched style every day.";

  return (
    <Link href={`/products/${product._id}`} style={{ display: "block" }}>
      <div className="product-card-wrapper">
        <div className="product-card-inner" style={{ aspectRatio: "0.78" }}>
          {/* ═══ FRONT FACE ═══ */}
          <div
            className="product-card-front"
            style={{ border: "1px solid var(--border-color)", height: "100%" }}
          >
            <div className="product-image" style={{ height: "68%" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  background: "#0d0d0f",
                }}
              >
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="product-actions">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleWishlist}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--glass-border)",
                    color: wishlisted
                      ? "var(--color-error)"
                      : "var(--foreground)",
                    cursor: "pointer",
                  }}
                >
                  {wishlisted ? (
                    <HiHeart size={14} />
                  ) : (
                    <HiOutlineHeart size={14} />
                  )}
                </motion.button>
              </div>

              {product.compareAtPrice > 0 &&
                product.compareAtPrice > product.price && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      background:
                        "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                      color: "#fff",
                    }}
                  >
                    SALE
                  </div>
                )}
            </div>

            <div style={{ padding: "16px 18px 20px" }}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                  marginBottom: "6px",
                }}
              >
                {product.brand}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {product.name}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <span
                    className="gradient-text"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    ${product.price}
                  </span>
                  {product.compareAtPrice > 0 &&
                    product.compareAtPrice > product.price && (
                      <span
                        style={{
                          fontSize: "12px",
                          textDecoration: "line-through",
                          color: "var(--muted)",
                        }}
                      >
                        ${product.compareAtPrice}
                      </span>
                    )}
                </div>
                {product.averageRating > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      fontSize: "12px",
                      color: "var(--color-warning)",
                    }}
                  >
                    <HiStar size={12} />
                    {product.averageRating}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ═══ BACK FACE — Product Details ═══ */}
          <div className="product-card-back" style={{ padding: "20px" }}>
            {/* Top section: Image on right, Name/Price on left */}
            <div
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "16px",
                alignItems: "flex-start",
              }}
            >
              {/* Left: Name and Price */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    marginBottom: "6px",
                  }}
                >
                  {product.brand}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: "10px",
                  }}
                >
                  {product.name}
                </p>
                <p
                  className="gradient-text"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "20px",
                    fontWeight: 800,
                  }}
                >
                  ${product.price}
                </p>
                {product.averageRating > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "8px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <HiStar
                        key={s}
                        size={12}
                        style={{
                          color:
                            s <= Math.round(product.averageRating)
                              ? "#d4a054"
                              : "var(--border-color)",
                        }}
                      />
                    ))}
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--muted)",
                        marginLeft: "4px",
                      }}
                    >
                      {product.averageRating}
                    </span>
                  </div>
                )}
              </div>

              {/* Right: Product Image */}
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "14px",
                  flexShrink: 0,
                  background: "#0d0d0f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border-color)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "14px",
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, var(--border-color), transparent)",
                marginBottom: "14px",
              }}
            />

            {/* Summary */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  marginBottom: "8px",
                }}
              >
                Overview
              </p>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {description}
              </p>
            </div>

            {/* Category + Quick Actions */}
            <div
              style={{
                marginTop: "14px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {product.category && (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--highlight-soft)",
                    color: "var(--highlight)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.category}
                </span>
              )}
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "var(--highlight)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View Details →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
