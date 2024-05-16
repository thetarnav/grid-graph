const TAU = 6.283185307179586

const ORANGE = "#FFCD73"
const RED    = "#E61400"
const BLUE   = "#0050BE"
const WHITE  = "#f6eee0"
const BLACK  = "#000000"

const CELL_SIZE      = 100
const NODE_SIZE	     = 70
const NODE_MARGIN	 = (CELL_SIZE - NODE_SIZE) / 2
const GRID_WIDTH     = 12
const GRID_ALL_CELLS = GRID_WIDTH * GRID_WIDTH

/**
 * @param   {number} a 
 * @param   {number} b 
 * @returns {number} */
function remainder(a, b) {
	return ((a % b) + b) % b
}
/**
 * @param   {number} value 
 * @param   {number} min 
 * @param   {number} max 
 * @returns {number} */
function wrap(value, min, max) {
	return remainder(value - min, max - min) + min
}
/**
 * @param   {number} value 
 * @param   {number} min 
 * @param   {number} max 
 * @returns {number} */
function bounce(value, min, max) {
	const range = max - min,
		rem = wrap(value - min, 0, 2 * range),
		distance = Math.abs(rem - range)
	return max - distance
}

/**
 * @param   {number} min inclusive
 * @param   {number} max exclusive
 * @returns {number} */
function random_int(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

class Vec2 {
	x = 0
	y = 0
}
/**
 * @param {number} x 
 * @param {number} y 
 * @returns {Vec2} */
function vec2(x, y) {
	var v = new Vec2()
	v.x = x
	v.y = y
	return v
}
/**
 * @param {Vec2} v
 * @returns {Vec2} */
function vec2_copy(v) {
	return vec2(v.x, v.y)
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {void} */
function vec2_add(a, b) {
	a.x += b.x
	a.y += b.y
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {Vec2} */
function vec2_sum(a, b) {
	return vec2(a.x + b.x, a.y + b.y)
}
/**
 * @param {Vec2} a
 * @param {number} b
 * @returns {void} */
function vec2_add_scalar(a, b) {
	a.x += b
	a.y += b
}
/**
 * @param {Vec2} a
 * @param {number} b
 * @returns {Vec2} */
function vec2_sum_scalar(a, b) {
	return vec2(a.x + b, a.y + b)
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {void} */
function vec2_sub(a, b) {
	a.x -= b.x
	a.y -= b.y
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {Vec2} */
function vec2_diff(a, b) {
	return vec2(a.x - b.x, a.y - b.y)
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {void} */
function vec2_mul(a, b) {
	a.x *= b.x
	a.y *= b.y
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {Vec2} */
function vec2_prod(a, b) {
	return vec2(a.x * b.x, a.y * b.y)
}
/**
 * @param {Vec2}   a
 * @param {number} b
 * @returns {void} */
function vec2_mul_scalar(a, b) {
	a.x *= b
	a.y *= b
}
/**
 * @param {Vec2}   a
 * @param {number} b
 * @returns {Vec2} */
function vec2_prod_scalar(a, b) {
	return vec2(a.x * b, a.y * b)
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {void} */
function vec2_div(a, b) {
	a.x /= b.x
	a.y /= b.y
}
/**
 * @param {Vec2} a
 * @param {Vec2} b
 * @returns {Vec2} */
function vec2_quotient(a, b) {
	return vec2(a.x / b.x, a.y / b.y)
}
/**
 * @param {Vec2} v
 * @returns {void} */
function vec2_negate(v) {
	v.x = -v.x
	v.y = -v.y
}

/** @typedef {CanvasRenderingContext2D} Ctx2D */

class State {
	ctx           = /** @type {Ctx2D} */ (/** @type {*} */ (null))
	canvas_top    = 0
	canvas_left   = 0
	canvas_width  = 0
	canvas_height = 0
	window_width  = 0
	window_height = 0
	dpr           = 0
	mouse         = new Vec2()
	mouse_down    = false
	drag_idx      = -1
	dragging      = false // dragging bool is separate from drag_idx,
	                      // because drag_idx is set to -1 when the drag is stopped for any reason
	swaps         = /** @type {number[]} */        (new Array(100))
	swaps_len     = 0
	nodes         = /** @type {Node[]} */          ([])
	grid          = /** @type {(Node | null)[]} */ ([])
	edges         = /** @type {Edge[]} */          ([])
}

class Node {
	id  = ""
	pos = new Vec2()
	idx = -1
}
function make_node() {
	const node = new Node()
	node.id = new_id()
	return node
}

class Edge {
	a = new Node()
	b = new Node()
}
/**
 * @param   {Node} a
 * @param   {Node} b
 * @returns {Edge} */
function edge(a, b) {
	let e = new Edge()
	e.a = a
	e.b = b
	return e
}
/**
 * @param   {State} s
 * @param   {Node}  a
 * @param   {Node}  b
 * @returns {void}  */
function connect_nodes(s, a, b) {
	let e = edge(a, b)
	s.edges.push(e)
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let last_id_count = 0

/** @returns {string} */
function new_id() {
	let id = ""
	let n  = last_id_count
	do {
		id = ALPHABET[n % ALPHABET.length] + id
		n = Math.floor(n / ALPHABET.length) - 1
	} while (n >= 0)
	last_id_count += 1
	return id
}

/**
 * @param {number} index
 * @returns {Vec2} */
function idx_num_to_vec(index) {
	const vec = new Vec2()
	vec.x = index % GRID_WIDTH
	vec.y = Math.floor(index / GRID_WIDTH)
	return vec
}

/**
 * @param {Vec2} pos
 * @returns {number} */
function idx_vec_to_num(pos) {
	return pos.y * GRID_WIDTH + pos.x
}

/**
 * @param {State} s
 * @param {Vec2 } pos
 * @returns {number} */
function pos_to_idx(s, pos) {
	let x = Math.floor(pos.x / CELL_SIZE * s.dpr)
	if (x < 0 || x >= GRID_WIDTH) {
		return -1
	}
	let y = Math.floor(((pos.y* s.dpr) - (x+1) % 2 * CELL_SIZE/2) / CELL_SIZE )
	if (y < 0 || y >= GRID_WIDTH) {
		return -1
	}
	return y * GRID_WIDTH + x
}

/**
 * @param   {Vec2} idx
 * @returns {Vec2} */
function idx_vec_to_pos(idx) {
	const pos = vec2_prod_scalar(idx, CELL_SIZE)
	pos.y += CELL_SIZE/2 * ((idx.x+1) % 2)
	return pos
}
/**
 * @param   {number} idx
 * @returns {Vec2}   */
function idx_num_to_pos(idx) {
	const pos = idx_num_to_vec(idx)
	vec2_mul_scalar(pos, CELL_SIZE)
	pos.y += CELL_SIZE/2 * ((idx % GRID_WIDTH + 1) % 2)
	return pos
}


/**
 * @param {number} n
 * @returns {string} */
function num_string(n) {
	let text = ""
	if (n < 0) {
		text += "-"
		n = -n
	} else {
		text += "+"
	}
	if (n < 10) {
		text += "0"
	}
	text += n.toFixed(2)
	return text
}

/**
 * @param {Vec2} v
 * @returns {string} */
function vec_string(v) {
	return `${num_string(v.x)}, ${num_string(v.y)}`
}

/**
 * @param {Ctx2D}  ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number} radius
 * @returns {void} */
function draw_box_rounded(ctx, x, y, w, h, radius) {
	ctx.beginPath()
	ctx.moveTo(x + radius, y)
	ctx.arcTo(x + w, y, x + w, y + h, radius)
	ctx.arcTo(x + w, y + h, x, y + h, radius)
	ctx.arcTo(x, y + h, x, y, radius)
	ctx.arcTo(x, y, x + w, y, radius)
	ctx.fill()
}

/**
 * @param {State } s 
 * @param {number} delta 
 */
function frame(s, delta) {
	let width  = s.canvas_width  * s.dpr
	let height = s.canvas_height * s.dpr

	s.ctx.clearRect(0, 0, width, height)

	// Drag

	let mouse_idx = pos_to_idx(s, s.mouse)

	switch (true) {
	case s.mouse_down && !s.dragging && s.grid[mouse_idx] !== null:
		// start dragging
		s.drag_idx = mouse_idx
		s.dragging = true
		break
	case !s.mouse_down && s.dragging:
		// stop dragging
		s.drag_idx  = -1
		s.dragging  = false
		s.swaps_len = 0
		break
	case s.mouse_down && s.drag_idx !== -1 && s.drag_idx !== mouse_idx:
		
		if (mouse_idx === -1) {
			// stop dragging that node
			s.drag_idx = -1
		} else {
			// move node
			let drag_idx   = s.drag_idx
			let drag_node  = s.grid[drag_idx]
			let mouse_node = s.grid[mouse_idx]

			s.grid[drag_idx]  = mouse_node
			s.grid[mouse_idx] = drag_node
			s.drag_idx        = mouse_idx

			console.assert(drag_node !== null);
			/** @type {Node} */(drag_node).idx = mouse_idx

			// try to reduce changing positins of other nodes while dragging
			// previous swaps will be undone, if the space is now free

			for (let i = s.swaps_len - 2; i >= 0; i -= 2) {
				let from = s.swaps[i+0]
				let to   = s.swaps[i+1]
				if (s.grid[to] === null) {
					s.grid[to]   = s.grid[from]
					console.assert(s.grid[to] !== null);
					/** @type {Node} */ (s.grid[to]).idx = to
					s.grid[from] = null
					s.swaps_len -= 2
				}
			}

			if (mouse_node !== null) {
				s.swaps[s.swaps_len+0] = drag_idx
				s.swaps[s.swaps_len+1] = mouse_idx
				s.swaps_len += 2
				mouse_node.idx = drag_idx
			}
		}

		break
	}

	// Draw hover cell

	if (mouse_idx !== -1) {
		let pos = idx_num_to_pos(mouse_idx)
		s.ctx.fillStyle = ORANGE + "80"
		draw_box_rounded(s.ctx, pos.x, pos.y, CELL_SIZE, CELL_SIZE, 10)
	}

	// Draw grid dots

	for (let i = 0; i < GRID_ALL_CELLS; i += 1) {
		let cell = s.grid[i]
		console.assert(cell === null || cell instanceof Node)

		let offset = idx_num_to_pos(i)
		vec2_add_scalar(offset, CELL_SIZE/2)

		s.ctx.fillStyle = ORANGE
		s.ctx.beginPath()
		s.ctx.arc(offset.x, offset.y, 6, 0, TAU)
		s.ctx.fill()
	}

	// Draw edges

	s.ctx.strokeStyle = BLACK
	s.ctx.lineWidth   = 4
	s.ctx.lineCap     = "round"

	for (let edge of s.edges) {
		let a_pos = vec2_sum_scalar(edge.a.pos, CELL_SIZE/2)
		let b_pos = vec2_sum_scalar(edge.b.pos, CELL_SIZE/2)

		s.ctx.beginPath()
		s.ctx.moveTo(a_pos.x, a_pos.y)
		const t = bounce(Math.abs(a_pos.x - b_pos.x) / CELL_SIZE + 1, 0, 1)
		s.ctx.bezierCurveTo(
			b_pos.x + CELL_SIZE/2 * t, a_pos.y,
			a_pos.x + CELL_SIZE/2 * t, b_pos.y,
			b_pos.x, b_pos.y,
		)
		s.ctx.stroke()
	}

	// Draw nodes

	s.ctx.font         = "24px sans-serif"
	s.ctx.textAlign    = "center"
	s.ctx.textBaseline = "middle"

	for (let node of s.nodes) {
		console.assert(node.idx !== -1)

		let goal = idx_num_to_pos(node.idx)
		let diff = vec2_diff(goal, node.pos)
		vec2_mul_scalar(diff, 0.22)
		vec2_add(node.pos, diff)

		let is_dragged = s.drag_idx === node.idx
		s.ctx.fillStyle = is_dragged ? BLUE : RED
		draw_box_rounded(s.ctx, node.pos.x + NODE_MARGIN, node.pos.y + NODE_MARGIN, NODE_SIZE, NODE_SIZE, 10)

		s.ctx.fillStyle = WHITE
		s.ctx.fillText(node.id, node.pos.x + CELL_SIZE/2, node.pos.y + CELL_SIZE/2)
	}

	// Debug

	{
		let margin = 10
		let text_i = 0
		s.ctx.fillStyle    = BLACK
		s.ctx.font         = "16px monospace"
		s.ctx.textAlign    = "left"
		s.ctx.textBaseline = "top"
		s.ctx.fillText(`mouse:      ${vec_string(s.mouse)}`  , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_idx:  ${mouse_idx}`            , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_down: ${s.mouse_down}`         , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`drag_idx:   ${s.drag_idx}`           , margin, margin + (text_i++) * 20)

		let swaps_text = "swaps:      "
		if (s.swaps_len === 0) {
			swaps_text += "none"
		}
		for (let i = 0; i < s.swaps_len; i += 2) {
			swaps_text += `${s.swaps[i]}->${s.swaps[i+1]} `
		}
		s.ctx.fillText(swaps_text, margin, margin + (text_i++) * 20)
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

	s.nodes = new Array(16)
	for (let i = 0; i < s.nodes.length; i += 1) {

		let grid_idx = 0
		do grid_idx = random_int(0, GRID_ALL_CELLS)
		while (s.grid[grid_idx] !== null)

		let node = make_node()
		node.idx = grid_idx
		node.pos = idx_num_to_pos(grid_idx)
		s.nodes[i] = node
		s.grid[grid_idx] = s.nodes[i]
	}

	for (let i = 0; i < 12; i += 1) {
		let a_idx = random_int(0, s.nodes.length-1)
		let b_idx = random_int(a_idx+1, s.nodes.length)

		connect_nodes(s, s.nodes[a_idx], s.nodes[b_idx])
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

	window.addEventListener("pointermove", e => {
		s.mouse.x = e.clientX - s.canvas_left
		s.mouse.y = e.clientY - s.canvas_top
	})
	window.addEventListener("pointerdown", e => {
		s.mouse_down = true
	})
	window.addEventListener("pointerup", e => {
		s.mouse_down = false
	})
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
