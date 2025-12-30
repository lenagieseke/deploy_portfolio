import React from "react";

type GetInTouchButtonProps = {
    email: string;
    subject?: string;
    className?: string;
    children?: React.ReactNode;
};

function buildMailto(email: string, subject?: string) {
    if (!subject) return `mailto:${email}`;
    const encoded = encodeURIComponent(subject);
    return `mailto:${email}?subject=${encoded}`;
}

export function GetInTouchButton({
    email,
    subject,
    className,
    children = "Say hi!",
}: GetInTouchButtonProps) {
    const href = buildMailto(email, subject);

    return (
        <a
        href={href}
        className={className}
        aria-label={`Email ${email}`}
        >
        {children}
        </a>
    );
}