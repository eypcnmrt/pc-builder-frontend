import React from "react";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser, clearSession } from "../../utils/token";

const UserCard = () => {
  const navigate = useNavigate();
  const user = getUser();

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "??";

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border-dim)",
        padding: "6px 6px 6px 10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* left cyan accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          background: "linear-gradient(to bottom, var(--color-cyan-bright), var(--color-cyan-mid))",
        }}
      />

      {/* Avatar */}
      <div
        className="font-display"
        style={{
          flexShrink: 0,
          width: "34px",
          height: "34px",
          background: "linear-gradient(135deg, var(--color-cyan-dim), var(--color-cyan-mid))",
          border: "1px solid var(--color-cyan-mid)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.05em",
          position: "relative",
        }}
      >
        {initials}
        {/* online indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: "8px",
            height: "8px",
            background: "var(--color-success)",
            border: "1.5px solid var(--color-bg-deep)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* User info */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, minWidth: 0 }}>
        <span
          className="font-body"
          style={{
            color: "var(--color-text-bright)",
            fontSize: "0.82rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "120px",
          }}
        >
          {user.username}
        </span>
        <span
          className="font-mono"
          style={{
            color: "var(--color-text-dim)",
            fontSize: "0.58rem",
            letterSpacing: "0.04em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "120px",
          }}
        >
          {user.email}
        </span>
      </div>

      {/* Separator */}
      <div
        style={{
          width: "1px",
          height: "28px",
          background: "var(--color-border-dim)",
          flexShrink: 0,
        }}
      />

      {/* Logout button */}
      <button
        onClick={handleLogout}
        title="Çıkış Yap"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-text-dim)",
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.2s, background 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-dim)";
          (e.currentTarget as HTMLButtonElement).style.background = "none";
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: "0.85rem" }} />
      </button>
    </div>
  );
};

export default UserCard;
