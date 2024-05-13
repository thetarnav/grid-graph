function State() {
	this.ctx    = /** @type {CanvasRenderingContext2D} */ (/** @type {*} */ (null))
	this.canvas_top	   = 0
	this.canvas_left   = 0
	this.canvas_width  = 0
	this.canvas_height = 0
	this.window_width  = 0
	this.window_height = 0
	this.dpr           = 0
}

/**
 * @param {State } s 
 * @param {number} delta 
 */
function frame(s, delta) {
	s.ctx.clearRect(0, 0, s.canvas_width * s.dpr, s.canvas_height * s.dpr)
	s.ctx.fillStyle = "black"
	s.ctx.fillRect (0, 0, s.canvas_width * s.dpr, s.canvas_height * s.dpr)
	s.ctx.fillStyle = "white"
	s.ctx.fillText(`delta: ${delta}`, 10, 10)
}

function main() {
	const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"))
	const dpr = window.devicePixelRatio || 1

	const ctx = canvas.getContext("2d")
	if (ctx === null) {
		document.body.textContent = "Failed to get 2d context"
		throw new Error("Failed to get 2d context")
	}

	const s = new State()
	s.ctx           = ctx
	s.dpr           = dpr
	s.canvas_top    = canvas.offsetTop
	s.canvas_left   = canvas.offsetLeft
	s.canvas_width  = canvas.width
	s.canvas_height = canvas.height
	s.window_width  = window.innerWidth
	s.window_height = window.innerHeight

	void requestAnimationFrame(prev_time => {
		/** @type {FrameRequestCallback} */
		const callback = time => {
			const delta = time - prev_time
			prev_time = time
			frame(s, delta)
			void requestAnimationFrame(callback)
		}
	
		void requestAnimationFrame(callback)
	})
	
	function updateCanvasSize() {
		const rect = canvas.getBoundingClientRect()
	
		canvas.width  = rect.width  * dpr
		canvas.height = rect.height * dpr
		canvas.width  = rect.width  * dpr
		canvas.height = rect.height * dpr

		s.canvas_top    = rect.top
		s.canvas_left   = rect.left
		s.canvas_width  = rect.width
		s.canvas_height = rect.height
		s.window_width  = window.innerWidth
		s.window_height = window.innerHeight
	}
	updateCanvasSize()
	window.addEventListener("resize", updateCanvasSize)
}
main()