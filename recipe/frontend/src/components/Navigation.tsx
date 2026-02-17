"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Calendar, Package, BookOpen, User } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/meal-plan", label: "식단", icon: Calendar },
  { href: "/recipe", label: "레시피", icon: BookOpen },
  { href: "/pantry", label: "냉장고", icon: Package },
  { href: "/profile", label: "프로필", icon: User },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 transition-colors ${
                isActive
                  ? "text-sage-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
