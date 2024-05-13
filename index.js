const TAO = 6.283185307179586

const ORANGE = "#FFA500"
const RED    = "#FF0000"
const WHITE  = "#FFFFFF"

const CELL_SIZE      = 100
const GRID_WIDTH     = 12
const GRID_ALL_CELLS = GRID_WIDTH * GRID_WIDTH

function State() {
	this.ctx           = /** @type {CanvasRenderingContext2D} */ (/** @type {*} */ (null))
	this.canvas_top	   = 0
	this.canvas_left   = 0
	this.canvas_width  = 0
	this.canvas_height = 0
	this.window_width  = 0
	this.window_height = 0
	this.dpr           = 0
	this.nodes		   = /** @type {Node[]} */         ([])
	this.grid		   = /** @type {(Node | null)[]} */([])
}

function Node() {
	this.id = ""
}

function Vec2() {
	this.x = 0
	this.y = 0
}

function make_node() {
	const node = new Node()
	node.id = new_id()
	return node
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let last_id_count = 0

/** @returns {string} */
function new_id() {
	const id = ALPHABET[last_id_count % ALPHABET.length]
	last_id_count += 1
	return id
}

/**
 * @param {number} index
 * @returns {Vec2} */
function index_to_vec(index) {
	const vec = new Vec2()
	vec.x = index % GRID_WIDTH
	vec.y = Math.floor(index / GRID_WIDTH)
	return vec
}

/**
 * @param {State } s 
 * @param {number} delta 
 */
function frame(s, delta) {
	let width  = s.canvas_width  * s.dpr
	let height = s.canvas_height * s.dpr

	s.ctx.clearRect(0, 0, width, height)
	s.ctx.fillStyle = "black"
	s.ctx.fillRect (0, 0, width, height)
	s.ctx.fillStyle = "white"
	s.ctx.fillText(`delta: ${delta}`, 10, 10)

	// Draw grid

	for (let i = 0; i < GRID_ALL_CELLS; i += 1) {
		let cell     = s.grid[i]
		let cell_pos = index_to_vec(i)
		let offset_x = cell_pos.x * CELL_SIZE
		let offset_y = cell_pos.y * CELL_SIZE

		s.ctx.fillStyle = ORANGE
		s.ctx.beginPath()
		s.ctx.arc(offset_x + CELL_SIZE/2, offset_y + CELL_SIZE/2, 6, 0, TAO)
		s.ctx.fill()

		if (cell !== null) {
			s.ctx.fillStyle = RED
			s.ctx.beginPath()
			s.ctx.fillRect(offset_x, offset_y, CELL_SIZE, CELL_SIZE)

			s.ctx.fillStyle = WHITE
			s.ctx.font = "24px sans-serif"
			s.ctx.textAlign = "center"
			s.ctx.textBaseline = "middle"
			s.ctx.fillText(cell.id, offset_x + CELL_SIZE/2, offset_y + CELL_SIZE/2)
		}
	}
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

	s.grid = new Array(GRID_ALL_CELLS).fill(null)

	s.nodes = new Array(10)
	for (let i = 0; i < s.nodes.length; i++) {
		s.nodes[i] = make_node()

		let index = 0
		do {
			index = Math.floor(Math.random() * GRID_ALL_CELLS)
		} while (s.grid[index] !== null)

		s.grid[index] = s.nodes[i]
	}

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
	
	function on_canvas_resize() {
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
	on_canvas_resize()
	window.addEventListener("resize", on_canvas_resize)
}
main()

/*
on_mouse_move :: proc(e: dom.Event) {
	mouse_pos = cast_vec2(e.mouse.client)
	mouse_rel = rvec2((mouse_pos - window_size / 2) / window_size)
}
on_mouse_down :: proc(e: dom.Event) {
	mouse_down = true
}
on_mouse_up :: proc(e: dom.Event) {
	mouse_down = false
}
on_wheel :: proc(e: dom.Event) {
	scale -= f32(e.wheel.delta.y) * 0.001
	scale = clamp(scale, 0, 1)
}
@export
on_window_resize :: proc "c" (vw, vh, cw, ch, cx, cy: f32) {
	window_size  = {vw, vh}
	canvas_size  = {cw, ch}
	canvas_pos   = {cx, cy}
	canvas_res   = cast_ivec2(canvas_size * dpr)
	aspect_ratio = canvas_size.x / canvas_size.y
}
*/
