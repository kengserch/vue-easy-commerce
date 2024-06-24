import { defineStore } from 'pinia';

import { collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';

export const useAdminProductStore = defineStore('admin-product', {
    state: () => ({
        list: [],
        filter: {
            search: '',
            status: '',
            sort: {
                updatedAt: 'desc',
            },
        },
    }),
    actions: {
        async loadProducts() {
            let productCol = query(collection(db, 'products'),orderBy('updatedAt', this.filter.sort.updatedAt));

            if (this.filter.search) {
                productCol = query(productCol, where('name', '==', this.filter.search));
            }
            if (this.filter.status) {
                productCol = query(productCol, where('status', '==', this.filter.status));
            }

            const productSnapshot = await getDocs(productCol);
            const products = productSnapshot.docs.map((doc) => {
                const convertedProduct = doc.data();
                convertedProduct.productId = doc.id;
                convertedProduct.updatedAt = convertedProduct.updatedAt.toDate();
                return convertedProduct;
            });
            this.list = products;
        },
        async getProduct(productId) {
            try {
                const productRef = doc(db, 'products', productId);
                const productSnapshot = await getDoc(productRef);
                return productSnapshot.data();
            } catch (error) {
                console.log('error', error);
            }
        },
        async addProduct(productData) {
            try {
                productData.remainQuantity = productData.quantity;
                productData.updatedAt = new Date();
                const productCol = collection(db, 'products');
                await addDoc(productCol, productData);
            } catch (error) {
                console.log('error', error);
            }
        },
        async updateProduct(productId, productData) {
            try {
                const updateProduct = {};
                updateProduct.name = productData.name;
                updateProduct.imageUrl = productData.imageUrl;
                updateProduct.price = productData.price;
                updateProduct.quantity = productData.quantity;
                updateProduct.remainQuantity = productData.quantity;
                updateProduct.about = productData.about;
                updateProduct.status = productData.status;
                updateProduct.updatedAt = new Date();

                const productRef = doc(db, 'products', productId);
                await setDoc(productRef, updateProduct);
            } catch (error) {
                console.log('error', error);
            }
        },
        async removeProduct(productId) {
            try {
                const productRef = doc(db, 'products', productId);
                await deleteDoc(productRef);
            } catch (error) {
                console.log('error', error);
            }
        },
    },
});
