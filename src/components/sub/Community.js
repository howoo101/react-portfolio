import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Community() {
	const nextId = useRef(1);
	const title = useRef(null);
	const content = useRef(null);

	const [allowed, setAllowed] = useState(true);
	const [posts, setPosts] = useState([]);
	const [inputs, setInputs] = useState({
		title: '',
		content: '',
	});
	const editTitle = useRef(null);
	const editContent = useRef(null);

	const onReset = () => {
		title.current.value = '';
		content.current.value = '';

		setInputs({ title: '', content: '' });

		title.current.focus();
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const createPost = () => {
		if (!title.current.value.trim() || !content.current.value.trim()) {
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const newPost = {
			id: nextId.current,
			title: inputs.title,
			content: inputs.content,
		};

		setPosts([{ ...newPost }, ...posts]);
		nextId.current += 1;

		onReset();
	};

	const deletePost = (deleteId) => {
		if (!window.confirm('해당 게시글을 삭제하겠습니까?')) return;
		setPosts(posts.filter((post) => post.id !== deleteId));
	};

	// 수정모드 진입 allowed가 true인 경우만 수정가능하도록
	const enableUpdate = (updateId) => {
		if (!allowed) return;
		setPosts(posts.map((post) => (post.id === updateId ? { ...post, update: true } : post)));

		// 일단 수정모드로 들어가면 다른 글이 수정이 안되도록 방지
		setAllowed(false);
	};

	const disableUpdate = (updateId) => {
		setPosts(
			posts.map((post) => (post.id === updateId ? { ...post, update: !post.update } : post))
		);
		setAllowed(true);
	};

	const updatePost = (updateId) => {
		const title = editTitle.current.value;
		const content = editContent.current.value;
		if (!title.trim() || !content.trim()) {
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const editPost = {
			id: updateId,
			title: title,
			content: content,
			update: false,
		};

		setPosts(posts.map((post) => (post.id === updateId ? { ...post, ...editPost } : post)));

		setAllowed(true);
	};
	useEffect(() => {
		console.log(posts);
	}, [posts, inputs]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input
					type='text'
					placeholder='제목을 입력하세요.'
					name='title'
					onChange={onChange}
					ref={title}
				/>
				<br />
				<textarea
					cols='30'
					rows='3'
					placeholder='본문을 입력하세요.'
					name='content'
					onChange={onChange}
					ref={content}
				></textarea>
				<br />

				<nav className='btnSet'>
					<button onClick={onReset}>리셋</button>
					<button onClick={createPost}>작성</button>
				</nav>
			</div>
			<div className='showBox'>
				{posts?.map((post, idx) => {
					return (
						<article key={idx}>
							{post.update ? (
								//수정모드
								<>
									<div className='txt'>
										<input
											type='text'
											defaultValue={post.title}
											ref={editTitle}
										/>
										<br />
										<textarea
											cols='30'
											rows='3'
											defaultValue={post.content}
											ref={editContent}
										></textarea>
									</div>

									<nav className='btnSet'>
										<button onClick={() => disableUpdate(post.id)}>
											CANCEL
										</button>
										<button onClick={() => updatePost(post.id)}>UPDATE</button>
									</nav>
								</>
							) : (
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>
									<nav className='btnSet'>
										<button onClick={() => enableUpdate(post.id)}>EDIT</button>
										<button onClick={() => deletePost(post.id)}>DELETE</button>
									</nav>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
