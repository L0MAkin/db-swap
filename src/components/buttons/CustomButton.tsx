import { FC, HTMLProps } from 'react';

type Props = HTMLProps<HTMLButtonElement>;

const CustomButton: FC<Props> = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className={
                'py-2 px-3 rounded bg-rose-500 text-white font-medium ' +
                className
            }
        >
            {children}
        </button>
    );
};

export default CustomButton;
