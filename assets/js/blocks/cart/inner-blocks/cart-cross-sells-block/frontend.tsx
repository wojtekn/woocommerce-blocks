interface Props {
	children?: JSX.Element | JSX.Element[];
	className?: string;
}

const FrontendBlock = ( { children, className = '' }: Props ): JSX.Element => {
	return <div className={ className }>{ children }</div>;
};

export default FrontendBlock;
