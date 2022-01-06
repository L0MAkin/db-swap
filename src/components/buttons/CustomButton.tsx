import { FC, HTMLProps } from 'react';

type Props = { text: string } & HTMLProps<HTMLButtonElement>;

const CustomButton: FC<Props> = ({ text, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="border-2 p-2 rounded border-blue-500 bg-blue-200 text-white"
        >
            {text}
        </button>
    );
};

export default CustomButton;
