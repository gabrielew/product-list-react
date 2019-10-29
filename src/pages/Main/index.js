import React, { useState, useEffect } from "react";
import api from "../../services/api";

import { Link } from "react-router-dom";

import "./styles.css";

const loadProducts = async (setProducts, setProductInfo, page = 1, setPage) => {
	const res = await api.get(`/products?page=${page}`);

	const { docs, ...productInfo } = res.data;

	setProducts(docs);
	setProductInfo(productInfo);
	setPage(page);
};

const prevPage = (page, setProducts, setProductInfo, setPage) => {
	if (page === 1) return;

	const pageNumber = page - 1;

	loadProducts(setProducts, setProductInfo, pageNumber, setPage);
};

const nextPage = (productInfo, page, setProducts, setProductInfo, setPage) => {
	if (page === productInfo.page) return;

	const pageNumber = page + 1;

	loadProducts(setProducts, setProductInfo, pageNumber, setPage);
};

const Main = () => {
	const [products, setProducts] = useState([]);
	const [productInfo, setProductInfo] = useState({});
	const [page, setPage] = useState(1);

	useEffect(() => {
		loadProducts(setProducts, setProductInfo, page, setPage);
	}, []);

	return (
		<div className="product-list">
			{products.map(product => (
				<article key={product._id}>
					<strong>{product.title}</strong>
					<p>{product.description}</p>

					<Link to={`/products/${product._id}`}>Acessar</Link>
				</article>
			))}
			<div className="actions">
				{page !== 1 ? (
					<button
						className="previous"
						onClick={() => prevPage(page, setProducts, setProductInfo, setPage)}
					>
						Anterior
					</button>
				) : (
					<button
						className="next"
						onClick={() =>
							nextPage(productInfo, page, setProducts, setProductInfo, setPage)
						}
					>
						Próximo
					</button>
				)}
			</div>
		</div>
	);
};

export default Main;
