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
    <div className="flex items-center gap-2.5 bg-[var(--color-bg-surface)] border border-[var(--color-border-dim)] pt-1.5 pr-1.5 pb-1.5 pl-[10px] relative overflow-hidden">
      {/* left cyan accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[linear-gradient(to_bottom,var(--color-cyan-bright),var(--color-cyan-mid))]" />

      {/* Avatar */}
      <div
        className="font-display shrink-0 w-[34px] h-[34px] bg-[linear-gradient(135deg,var(--color-cyan-dim),var(--color-cyan-mid))] border border-[var(--color-cyan-mid)] flex items-center justify-center text-[0.8rem] font-bold text-white tracking-[0.05em] relative"
      >
        {initials}
        {/* online indicator */}
        <div className="absolute -bottom-px -right-px w-2 h-2 bg-[var(--color-success)] border-[1.5px] border-[var(--color-bg-deep)] rounded-full" />
      </div>

      {/* User info */}
      <div className="flex flex-col leading-[1.2] min-w-0">
        <span
          className="font-body text-[var(--color-text-bright)] text-[0.82rem] font-semibold tracking-[0.02em] overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]"
        >
          {user.username}
        </span>
        <span
          className="font-mono text-[var(--color-text-dim)] text-[0.58rem] tracking-[0.04em] overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]"
        >
          {user.email}
        </span>
      </div>

      {/* Separator */}
      <div className="w-px h-7 bg-[var(--color-border-dim)] shrink-0" />

      {/* Logout button */}
      <button
        onClick={handleLogout}
        title="Çıkış Yap"
        className="bg-transparent border-0 cursor-pointer text-[var(--color-text-dim)] py-1.5 px-2 flex items-center justify-center transition-[color,background] duration-200 shrink-0 hover:text-red-400 hover:bg-[rgba(239,68,68,0.08)]"
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="text-[0.85rem]" />
      </button>
    </div>
  );
};

export default UserCard;
