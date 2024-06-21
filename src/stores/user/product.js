import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list:[],
    loaded: false
  }),
  actions: {
    loadProducts () {
      const products = localStorage.getItem('admin-products')
      if(products){
          this.list = JSON.parse(products)
          this.loaded = true
      }
      console.log(products)
    },
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    },
    getProduct (index){
      try {
        //this.selectedProduct = this.list.find(product => product.id == id)
        //return this.list.find(product => product.id == id)
         return this.list[index]
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})

/*
{
        id:1,
        name: 'Made in USA 990v6',
        description: 'The designers of the first 990 were tasked with creating the single best running shoe on the market. The MADE in USA 990v6 embraces this original mandate, with a series of performance-inspired updates. The upper dispenses with the standard midfoot saddle, allowing the pigskin and synthetic overlays to flow from heel to toe across the mesh underlay, for a speedy, streamlined look. While the evolved design marks one of the most dramatic changes from one generation model to the next that the 990 has ever seen, the greatest leap forward occurs on the inside. The addition of FuelCell midsole cushioning means that the evolution of the 990 can be felt as much as it can be seen.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/w990gl6_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600',
        quantity: 1,
        about: 'Mens',
        status: 'open',
        price: 8000,
        color:'Grey'
      },
      {
        id:2,
        name: 'Made in USA 990v6',
        description: 'The designers of the first 990 were tasked with creating the single best running shoe on the market. The MADE in USA 990v6 embraces this original mandate, with a series of performance-inspired updates. The upper dispenses with the standard midfoot saddle, allowing the pigskin and synthetic overlays to flow from heel to toe across the mesh underlay, for a speedy, streamlined look. While the evolved design marks one of the most dramatic changes from one generation model to the next that the 990 has ever seen, the greatest leap forward occurs on the inside. The addition of FuelCell midsole cushioning means that the evolution of the 990 can be felt as much as it can be seen.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/w990bk6_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=440&hei=440',
        quantity: 20,
        about: 'Mens',
        status: 'open',
        price: 8000,
        color:'Black with white'
      },
      {
        id:3,
        name: 'Made in USA 990v4',
        description:'The 990’s original designers were tasked with creating the single best running shoe on the market. The finished product more than lived up to its billing. When it hit shelves for the first time in 1982 the 990 sported an elegantly understated grey colorway, and a then unheard of three-figure price tag. For avid runners and ahead of the curve tastemakers alike, the 990 was a mark of quality and superior taste. There have been updates to the design since ’82, and more color options, but the 990’s aspirational status symbol aura has never changed. Simply put, the 990 is the shoe so good, that we’ve never stopped making it. The MADE in USA 990v4, originally introduced in 2016, continued to refine the v3s modernization of the silhouette. This new addition to the Seasonal Collection features  a grey matter, white, and black palette, outfitted in hairy suede, mesh, and nubuck.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/u990tg4_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600',
        quantity: 20,
        about: 'Unisex',
        status: 'open',
        price: 8500,
        color:'Grey with black'
      },
      {
        id:4,
        name: 'Made in USA 990v4 Core',
        description:'The 990’s original designers were tasked with creating the single best running shoe on the market. The finished product more than lived up to its billing. When it hit shelves for the first time in 1982 the 990 sported an elegantly understated grey colorway, and a then unheard of three-figure price tag. For avid runners and ahead of the curve tastemakers alike, the 990 was a mark of quality and superior taste. There have been updates to the design since ’82, and more color options, but the 990’s aspirational status symbol aura has never changed. Simply put, the 990 is the shoe so good, that we’ve never stopped making it. The MADE in USA 990v4, originally introduced in 2016, continued to refine the v3s modernization of the silhouette with a streamlined take on the mesh and pigskin suede overlay upper construction and fine-tuned adjustments to the cushioning.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/u990gr4_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600',
        quantity: 20,
        about: 'Unisex',
        status: 'open',
        price: 8500,
        color:'Grey with silver'
      },
      {
        id:5,
        name: 'Made in USA 998 Core',
        description:'A true embodiment of New Balance`s timeless design and performance innovation returns to the MADE in USA lineup in 2023. The original 998, released in 1993, was the first shoe to utilize ABZORB cushioning. This revolutionary step forward in shock absorption was matched visually with a sleek update to the classic 99X series look. The MADE in USA 998 features an OG grey colorway in a premium pigskin suede and mesh upper construction.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/u998gr_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600',
        quantity: 20,
        about: 'Unisex',
        status: 'open',
        price: 7000,
        color:'Grey with silver'
      },
      {
        id:6,
        name: 'MADE in USA 993 Core',
        description:'Superior comfort meets classic style in our men’s Made in US 993 running shoe. A favorite from the legendary 990 series, the 993 features responsive cushioning and premium materials ready for a run or all-day wear.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/mr993gl_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=440&hei=440',
        quantity: 20,
        about: 'Mens',
        status: 'open',
        price: 8000,
        color:'Grey'
      },
      {
        id:7,
        name: 'MADE in USA 996 Core',
        description:'Introduced in 1988, the 996 was the first radical offshoot of the original 990. The 996’s technological features represented six years of evolution, and featured a subtly streamlined exterior design, making for an exceptionally wearable, high-performance shoe. The MADE in USA 996 is outfitted with a premium, pigskin suede and features ENCAP cushioning.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/u996gr_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=440&hei=440',
        quantity: 20,
        about: 'Unisex',
        status: 'open',
        price: 7000,
        color:'Grey with silver'
      },
      {
        id:8,
        name: 'ALD x New Balance Made in USA 996',
        description:'Introduced in 1988, the 996 was the first significant evolution of the original 990 design. The 996’s updated features represented six years of technological progress, and featured a subtly streamlined exterior design, making for an exceptionally wearable, high-performance shoe. Aimé Leon Dore & New Balance offer a luxe, minimalism-inspired take on the 996. The upper features supple premium leather, with smooth underlays and tumbled overlays outfitted in classic, refined, black and white colorways.',
        imageUrl: 'https://nb.scene7.com/is/image/NB/u996bw_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=440&hei=440',
        quantity: 20,
        about: 'Unisex',
        status: 'open',
        price: 8500,
        color:'Black with sandstone and white'
      }  
*/
