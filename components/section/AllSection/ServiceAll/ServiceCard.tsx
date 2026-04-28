// ---------------- Reusable Service Card ----------------
interface ServiceCardProps {
    name: string
    description: string
    category?: string
    onClick: () => void
}

export function ServiceCard({
    name,
    description,
    category,
    onClick,
}: ServiceCardProps) {
    return (
        <div
            className="
        flex flex-col justify-between
        w-full border border-gray-200 bg-white p-4
        rounded-lg shadow-sm
        hover:shadow-md hover:border-blue-500
        transition-all duration-200
      "
        >
            {/* Top Section */}
            <div className="flex-1 text-left">
                <h3 className="text-base sm:text-lg font-semibold text-[#003366]">
                    {name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {description}
                </p>

                {/* Category Badge */}
                {category && (
                    <span className="mt-2 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                        {category}
                    </span>
                )}
            </div>

            {/* View Services Button */}
            <button
                onClick={onClick}
                className="
          mt-4 w-full text-left text-[#003366] font-medium
          hover:text-blue-950 underline underline-offset-2
          focus:outline-none focus:ring-2 focus:ring-blue-950
          rounded transition
        "
            >
                View Services →
            </button>
        </div>
    )
}
