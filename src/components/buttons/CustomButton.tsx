import { FC, HTMLProps } from 'react';

type Props = HTMLProps<HTMLButtonElement>;

const CustomButton: FC<Props> = ({ children, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="py-2 px-3 rounded bg-rose-500 text-white font-medium"
        >
            {children}
        </button>
    );
};

export default CustomButton;
