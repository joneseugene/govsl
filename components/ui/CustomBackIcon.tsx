export function CustomBackIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
    return (
        <span
            className={`inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size, fontSize: size, lineHeight: 1 }}
        >
            &lt;
        </span>
    );
}
