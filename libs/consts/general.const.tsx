import { Components } from "react-markdown";

export const markdownComponents: Partial<Components> = {
    p: ({ children }) => (
        <span className="text-[19px] leading-[1.58] text-gray-700 block mb-3 last:mb-0">
            {children}
        </span>
    ),
    strong: ({ ...props }) => (
        <strong className="font-semibold text-[#003366]" {...props} />
    ),
    em: ({ ...props }) => <em className="text-gray-700" {...props} />,
    a: ({ ...props }) => (
        <a
            className="text-[#1D70B8] underline decoration-[#1D70B8]/40 hover:decoration-[#1D70B8]/70"
            {...props}
        />
    ),
}