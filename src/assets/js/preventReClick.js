// import Vue from 'vue'

// export default {
// 	Vue.directive('preventReClick', {
// 	    inserted (el, binding) {
// 	        el.addEventListener('click', () => {
// 	            if (!el.disabled) {
// 	                el.disabled = true
// 	                setTimeout(() => {
// 	                    el.disabled = false
// 	                }, binding.value || 2000)
// 	            }
// 	        })
// 	    }
// 	})
// }

import Vue from 'vue'

//防止用户重复提交
const preventReClick = Vue.directive('preventReClick', {
    inserted: function (el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 4000)
            }
        })
    }
});
 
export { preventReClick }