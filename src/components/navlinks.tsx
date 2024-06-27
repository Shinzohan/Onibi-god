"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkType {
    url: string;
    title: string;
}

interface NavLinkProps {
    link: LinkType;
}

const NavLink: React.FC<NavLinkProps> = ({ link }) => {
    const pathName = usePathname();

    return (
        <Link
            className={`rounded p-1 ${pathName === link.url ? "bg-gray-500 rounded-3xl text-white" : ""}`}
            href={link.url}
        >
            {link.title}
        </Link>
    );
};

export default NavLink;
