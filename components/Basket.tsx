import { useId, type DragEvent } from "react";
import { itemCount, type CartLine } from "@/lib/game";
import { CartProduct } from "./CartProduct";

interface Props {
  lines: CartLine[];
  receiving: boolean;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
}

export function Basket({ lines, receiving, onDragOver, onDrop }: Props) {
  const id = useId();
  const metal = `${id}-metal`;
  const tire = `${id}-tire`;
  return (
    <section
      className={`physical-cart ${receiving ? "is-receiving" : ""}`}
      aria-label={`Shopping cart, ${itemCount(lines)} units`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="cart-heading">
        <h2 className="font-serif text-2xl text-forest">Your cart</h2>
        <p className="text-xs text-ink-soft">{itemCount(lines)} units</p>
      </div>
      <div className="cart-scene">
        {/* Side-view frame follows the reference cart's sloping wire basket. */}
        <svg
          className="cart-frame"
          viewBox="0 0 600 420"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7e9b83" />
              <stop offset=".28" stopColor="#21573e" />
              <stop offset=".55" stopColor="#497f5a" />
              <stop offset=".78" stopColor="#153e2d" />
              <stop offset="1" stopColor="#6a8d72" />
            </linearGradient>
            <radialGradient id={tire}>
              <stop offset=".4" stopColor="#a6a59a" />
              <stop offset=".48" stopColor="#555952" />
              <stop offset=".7" stopColor="#333832" />
              <stop offset="1" stopColor="#1f2621" />
            </radialGradient>
          </defs>
          <ellipse cx="320" cy="397" rx="235" ry="12" fill="#233b2918" />
          <path
            d="M104 349h424"
            fill="none"
            stroke="#224b36"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <g fill={`url(#${tire})`} stroke="#8e9486" strokeWidth="2">
            <circle cx="120" cy="372" r="27" />
            <circle cx="512" cy="372" r="27" />
          </g>
          <g fill="#b8b8a6" stroke="#727b70" strokeWidth="3">
            <path d="M105 342h29l-7 29h-15z" />
            <path d="M497 342h29l-7 29h-15z" />
          </g>
          <g
            fill="none"
            stroke={`url(#${metal})`}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M157 281l-48 48q-14 20 11 20h407q18 0 9-11L239 318"
              strokeWidth="11"
            />
            <path d="M251 279l-32 43q-10 14 10 14l303 5" strokeWidth="9" />
            <path
              d="M43 39l49 26 65 216 403-15 6-169L100 64"
              strokeWidth="10"
            />
            <path d="M96 65l35-26 31 3-9 41" strokeWidth="5" />
            <path d="M35 33q-8-11 3-13l38 10q8 3 7 12" strokeWidth="17" />
            <path
              d="M107 79l451 30-5 146-388 17z"
              strokeWidth="2"
              opacity=".7"
            />
            {Array.from({ length: 18 }, (_, index) => {
              const x = 110 + index * 25;
              return (
                <path
                  key={x}
                  d={`M${x} ${77 + index * 1.7}L${171 + index * 22} ${273 - index * 0.8}`}
                  strokeWidth="3"
                />
              );
            })}
            <path
              d="M119 121l443 24M132 166l428 17M145 211l413 8M157 257l399-4"
              strokeWidth="4"
            />
            <path d="M100 66l466 31M157 281l403-15" strokeWidth="8" />
          </g>
          <path
            d="M105 65l455 32M161 280l393-15M123 348h404"
            fill="none"
            stroke="#c9ddc3"
            strokeWidth="2"
            opacity=".65"
          />
        </svg>
        <div className="cart-contents" data-cart-target>
          {lines.length === 0 ? (
            <p className="cart-empty">
              A week of possibilities.
              <br />
              Pick something from the shelves.
            </p>
          ) : (
            lines.map((line, index) => (
              <CartProduct
                key={line.item.id}
                line={line}
                index={index}
                count={lines.length}
              />
            ))
          )}
        </div>
        <svg
          className="cart-front-wire"
          viewBox="0 0 600 420"
          aria-hidden="true"
          focusable="false"
        >
          <g
            fill="none"
            stroke={`url(#${metal})`}
            strokeWidth="3"
            strokeLinejoin="round"
          >
            {Array.from({ length: 12 }, (_, index) => (
              <path
                key={index}
                d={`M${112 + index * 40} ${79 + index * 2.5}L${172 + index * 34} ${272 - index}`}
              />
            ))}
            <path d="M119 121l443 24M132 166l428 17M145 211l413 8M157 257l399-4" />
            <path d="M100 66l466 31-6 169-403 15z" strokeWidth="7" />
          </g>
        </svg>
      </div>
      <p className="cart-instruction">
        {receiving
          ? "Drop your grocery into the cart"
          : "Tap a product to add · Drag it here on desktop"}
      </p>
    </section>
  );
}
