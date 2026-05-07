// ---------------- Reusable Service Card ----------------
interface ServiceCardProps {
  name: string;
  description: string;
  category?: string;
  onClick: () => void;
}

export function ServiceCard({ name, description, category, onClick }: ServiceCardProps) {
  return (
    <div
      className="
        flex h-full flex-col
        border border-gray-200 bg-white p-4
        rounded-lg shadow-sm
        hover:shadow-md hover:border-blue-500
        transition-all duration-200
        "
    >
      {/* Content */}
      <div className="text-left">
        <h3 className="text-base sm:text-lg font-semibold text-[#003366] line-clamp-2 min-h-12">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>

        {category && (
          <span className="mt-2 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
            {category}
          </span>
        )}
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        className="
                    mt-auto flex items-center justify-center gap-2
                    w-full px-4 py-2.5
                    bg-blue-950 text-white text-sm font-medium
                    rounded-lg
                    transition-all duration-200
                    hover:bg-blue-800 hover:shadow-md hover:cursor-pointer
                    active:scale-[0.98]
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                "
      >
        See more
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
}
