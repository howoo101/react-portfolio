import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const Modal = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	});
	return (
		<>
			{open && (
				<aside className='modal' ref={ref}>
					<div className='content'>{props.children}</div>
					<span className='close' onClick={() => setOpen(false)}>
						close
					</span>
				</aside>
			)}
		</>
	);
});

export default Modal;
