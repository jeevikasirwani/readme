interface HeadingProps {
    label: string;
}

export function Header({label}: HeadingProps) {
    return (
        <div className="text-4xl font-bold text-center mt-4 text-gray-900">
            {label}
        </div>
    );
}
