import React from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact-section" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--color-muted) border-t border-(--color-border)">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Brand */}
          <div>
            <a href="#" className="text-xl font-bold text-(--color-text)">
              <span className="text-(--color-accent)">S</span>ridhar.
            </a>
            <p className="text-sm text-(--color-text-light) mt-2 max-w-xs leading-relaxed">
              Full Stack Developer building clean, fast, and functional web products.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-(--color-text-light) hover:text-(--color-accent) transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="https://github.com/WebDev-Sridhar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-(--color-border) text-(--color-text-light)
                         hover:border-(--color-accent) hover:text-(--color-accent) transition-all duration-200"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.6 9.6 0 0 1 2.496-.336 9.6 9.6 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/sridhar-front-end-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-(--color-border) text-(--color-text-light)
                         hover:border-(--color-accent) hover:text-(--color-accent) transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M8.339 18.337H5.667v-8.59h2.672zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096m11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-(--color-border) my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-(--color-text-light)">
            © {year} Sridhar. All rights reserved.
          </p>
          <p className="text-xs text-(--color-text-light)">
            Built with React · Tailwind CSS · Firebase
          </p>
        </div>

      </div>
    </footer>
  );
}
