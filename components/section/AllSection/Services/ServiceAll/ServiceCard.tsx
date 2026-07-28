interface ServiceCardProps {
  name: string;
  description: string;
  category?: string;
  onClick: () => void;
}

export function ServiceCard({ name, description, onClick }: ServiceCardProps) {
  return (
    <div
      className="
          text-left w-full
          mb-3
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
        "
    >
      {/* Content */}
      <div className="text-left">
        <h5
          onClick={onClick}
          className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
        `}
        >
          {name}
        </h5>

        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
