const TAU = 6.283185307179586
const PI  = Math.PI

const max    = Math.max
const min    = Math.min
const abs    = Math.abs
const sin    = Math.sin
const asin   = Math.asin
const cos    = Math.cos
const atan2  = Math.atan2
const sqrt   = Math.sqrt
const floor  = Math.floor
const ceil   = Math.ceil
const round  = Math.round
const random = Math.random
const pow    = Math.pow
const hypot  = Math.hypot

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
		distance = abs(rem - range)
	return max - distance
}

/**
 * @param   {number} min inclusive
 * @param   {number} max exclusive
 * @returns {number} */
function random_int(min, max) {
	return floor(random() * (max - min) + min)
}

class Vec2 {
	x = 0
	y = 0
}
/**
 * @param   {number} x 
 * @param   {number} y 
 * @returns {Vec2} */
function vec2(x, y) {
	var v = new Vec2()
	v.x = x
	v.y = y
	return v
}
/**
 * @param   {Vec2} v
 * @returns {Vec2} */
function vec_copy(v) {
	return vec2(v.x, v.y)
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {void} */
function vec_add(a, b) {
	a.x += b.x
	a.y += b.y
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {Vec2} */
function vec_sum(a, b) {
	return vec2(a.x + b.x, a.y + b.y)
}
/**
 * @param   {Vec2} a
 * @param   {number} b
 * @returns {void} */
function vec_add_scalar(a, b) {
	a.x += b
	a.y += b
}
/**
 * @param   {Vec2} a
 * @param   {number} b
 * @returns {Vec2} */
function vec_sum_scalar(a, b) {
	return vec2(a.x + b, a.y + b)
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {void} */
function vec_sub(a, b) {
	a.x -= b.x
	a.y -= b.y
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {Vec2} */
function vec_diff(a, b) {
	return vec2(a.x - b.x, a.y - b.y)
}
/**
 * @param   {Vec2}   a
 * @param   {number} b
 * @returns {void}   */
function vec_sub_scalar(a, b) {
	a.x -= b
	a.y -= b
}
/**
 * @param   {Vec2}   a
 * @param   {number} b
 * @returns {Vec2}   */
function vec_diff_scalar(a, b) {
	return vec2(a.x - b, a.y - b)
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {void} */
function vec_mul(a, b) {
	a.x *= b.x
	a.y *= b.y
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {Vec2} */
function vec_prod(a, b) {
	return vec2(a.x * b.x, a.y * b.y)
}
/**
 * @param   {Vec2}   a
 * @param   {number} b
 * @returns {void} */
function vec_mul_scalar(a, b) {
	a.x *= b
	a.y *= b
}
/**
 * @param   {Vec2}   a
 * @param   {number} b
 * @returns {Vec2}   */
function vec_prod_scalar(a, b) {
	return vec2(a.x * b, a.y * b)
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {void} */
function vec_div(a, b) {
	a.x /= b.x
	a.y /= b.y
}
/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {Vec2} */
function vec_quotient(a, b) {
	return vec2(a.x / b.x, a.y / b.y)
}
/**
 * @param   {Vec2} v
 * @returns {void} */
function vec_negate(v) {
	v.x = -v.x
	v.y = -v.y
}
/**
 * @param   {Vec2} v
 * @returns {void} */
function vec_abs(v) {
	v.x = abs(v.x)
	v.y = abs(v.y)
}
/**
 * @param   {Vec2}   a
 * @param   {Vec2}   b
 * @returns {number} */
function vec_distance(a, b) {
	return hypot(a.x - b.x, a.y - b.y)
}
/**
 * @param   {Vec2}   a
 * @param   {Vec2}   b
 * @returns {number} */
function vec_angle(a, b) {
	return atan2(b.y - a.y, b.x - a.x)
}
/**
 * @param   {Vec2}   v
 * @param   {number} angle
 * @param   {number} dist
 * @returns {void}   */
function vec_move(v, angle, dist) {
	v.x += cos(angle) * dist
	v.y += sin(angle) * dist
}
/**
 * @param   {Vec2}   v
 * @param   {number} angle
 * @param   {number} dist
 * @returns {Vec2}   */
function vec_moved(v, angle, dist) {
	return vec2(v.x + cos(angle) * dist, v.y + sin(angle) * dist)
}
/**
 * @param   {Vec2} v
 * @returns {void} */
function vec_normalize(v) {
	let len = hypot(v.x, v.y)
	if (len !== 0) {
		v.x /= len
		v.y /= len
	}
}
/**
 * @param   {Vec2} v
 * @returns {Vec2} */
function vec_normalized(v) {
	let len = hypot(v.x, v.y)
	if (len !== 0) {
		return vec2(v.x / len, v.y / len)
	}
	return new Vec2()
}
/**
 * @param   {Vec2}   a
 * @param   {Vec2}   b
 * @returns {number} */
function cross(a, b) {
	return a.x * b.y - a.y * b.x
}

class Arc extends Vec2 {
	r     = 0
	start = 0
	end   = 0
}

class Rect extends Vec2 {
	w = 0
	h = 0
}

/**
 * @param   {number} x
 * @param   {number} y
 * @param   {number} w
 * @param   {number} h
 * @returns {Rect}   */
function rect(x, y, w, h) {
	let r = new Rect()
	r.x = x
	r.y = y
	r.w = w
	r.h = h
	return r
}

/**
 * @param   {Vec2}   start
 * @param   {Vec2}   ctrl_1
 * @param   {Vec2}   ctrl_2
 * @param   {Vec2}   end
 * @param   {number} t
 * @returns {Vec2}   */
function get_bezier_point(start, ctrl_1, ctrl_2, end, t) {
	let u = 1 - t
    return vec2(
		(u*u*u * start.x) + (3 * u*u*t * ctrl_1.x) + (3 * u*t*t * ctrl_2.x) + (t*t*t * end.x),
		(u*u*u * start.y) + (3 * u*u*t * ctrl_1.y) + (3 * u*t*t * ctrl_2.y) + (t*t*t * end.y),
	)
}

/**
 * @param   {Vec2}    p1
 * @param   {Vec2}    p2
 * @param   {Vec2}    p3
 * @param   {Vec2}    p4
 * @returns {boolean} */
function segments_intersecting(p1, p2, p3, p4) {
	let d1 = cross(vec_diff(p1, p3), vec_diff(p4, p3))
	let d2 = cross(vec_diff(p2, p3), vec_diff(p4, p3))
	let d3 = cross(vec_diff(p3, p1), vec_diff(p2, p1))
	let d4 = cross(vec_diff(p4, p1), vec_diff(p2, p1))

    // if the cross products have different signs, the segments intersect
    return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
}

/**
 * @param   {number} angle 
 * @returns {number} */
function angle_normalized(angle) {
	return ((angle % TAU) + TAU) % TAU
}

/**
 * @param   {number}  angle 
 * @param   {number}  start 
 * @param   {number}  end 
 * @returns {boolean} */
function angle_in_range(angle, start, end) {
    angle = angle_normalized(angle)
    start = angle_normalized(start)
    end   = angle_normalized(end)

	return start < end
		? start <= angle && angle <= end
		: start <= angle || angle <= end
}

/**
 * This checks intersection of a segment with an arc.               \
 * But the arc has to be larger than the segment.                   \
 * The segment can cross the arc from the inside,                   \
 * or from the outside.                                             \
 * But the circle making the arc, cannot be impaled by the segment.
 * 
 * @param   {Arc}     arc
 * @param   {Vec2}    start
 * @param   {Vec2}    end
 * @returns {boolean} */
function arc_segment_intersecting(arc, start, end) {
	let dist_start = vec_distance(start, arc)
	let dist_end   = vec_distance(end, arc)

	let crossing = (dist_start <  arc.r && dist_end >= arc.r) ||
	               (dist_start >= arc.r && dist_end <  arc.r)

	if (!crossing) return false

	let angle_start = vec_angle(arc, start)
	let angle_end   = vec_angle(arc, end)

	return angle_in_range(angle_start, arc.start, arc.end) ||
	       angle_in_range(angle_end,   arc.start, arc.end)
}

/**
 * @param   {Vec2} a
 * @param   {Vec2} b
 * @returns {Arc}  */
function get_arc_between(a, b) {
	let dist  = vec_distance(a, b) / 2
	let lx    = b.x - a.x
	let ly    = b.y - a.y
	let l     = sqrt(lx*lx + ly*ly)
	let mid   = vec2(a.x + lx/2, a.y + ly/2)
	let angle = atan2(ly, lx)
	let moved = vec_moved(mid, angle - PI/2, dist)
	let r     = vec_distance(a, moved)
	let swap  = asin(l / (2*r))
	let arc   = new Arc()
	arc.x     = moved.x
	arc.y     = moved.y
	arc.r     = r
	arc.start = angle + PI/2 - swap
	arc.end   = angle + PI/2 + swap
	return arc
}

/**
 * @param   {Vec2}    point
 * @param   {Rect}    rect
 * @returns {boolean} */
function is_point_in_rect(point, rect) {
	return point.x >= rect.x && point.x <= rect.x + rect.w &&
	       point.y >= rect.y && point.y <= rect.y + rect.h
}

const ORANGE = "#FFCD73"
const RED    = "#E61400"
const BLUE   = "#0050BE"
const WHITE  = "#f6eee0"
const BLACK  = "#1a1a1a"

const CELL_SIZE           = 100
const NODE_SIZE	          = 70
const NODE_MARGIN	      = (CELL_SIZE - NODE_SIZE) / 2
const NODE_SWAP_THRESHOLD = 0.5 * Math.sqrt((CELL_SIZE/2) * (CELL_SIZE/2))
const GRID_WIDTH          = 12
const GRID_ALL_CELLS      = GRID_WIDTH * GRID_WIDTH
const DRAW_POINTS_MAX     = 32


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
	drag_node     = new Node()
	drag_start_idx= -1
	dragging      = false // dragging bool is separate from drag_idx,
	                      // because drag_idx is set to -1 when the drag is stopped for any reason
	swaps         = /** @type {number[]} */(new Array(100))
	swaps_len     = 0
	draw_points   = new Float64Array(DRAW_POINTS_MAX)
	draw_len	  = 0
	drawing	      = false
	nodes         = /** @type {Node[]} */ ([])
	grid          = /** @type {Node[]} */ ([])
	edges         = /** @type {Edge[]} */ ([])
}

class Node {
	id  = ""
	pos = new Vec2()
	idx = -1
}
function make_node() {
	return new Node()
}
/**
 * @param   {State}  s
 * @param   {number} idx
 * @returns {Node}   */
function node_at(s, idx) {
	if (idx < 0 || idx >= GRID_ALL_CELLS) {
		return make_node()
	}
	return s.grid[idx]
}

class Edge {
	a = make_node()
	b = make_node()
	intersecting_draw = false
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
	if (a.idx !== -1 && b.idx !== -1 && a !== b) {
		s.edges.push(edge(a, b))
	}
}
/**
 * @param   {State}   s
 * @param   {Node}    a
 * @param   {Node}    b
 * @returns {boolean} */
function is_connected(s, a, b) {
	if (a.idx === -1 || b.idx === -1 || a === b) {
		return false
	}
	for (let edge of s.edges) {
		if ((edge.a === a && edge.b === b) || (edge.a === b && edge.b === a)) {
			return true
		}
	}
	return false
}

/**
 * @param   {Node} node 
 * @returns {Rect} */
function node_rect(node) {
	let rect = new Rect()
	rect.x = node.pos.x + NODE_MARGIN
	rect.y = node.pos.y + NODE_MARGIN
	rect.w = NODE_SIZE
	rect.h = NODE_SIZE
	return rect
}

/**
 * @param   {Vec2}   pos
 * @param   {Node}   node
 * @returns {boolean} */
function is_pos_in_node(pos, node) {
	let rect = node_rect(node)
	return is_point_in_rect(pos, rect)
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let last_id_count = 0

/** @returns {string} */
function new_id() {
	let id = ""
	let n  = last_id_count
	do {
		id = ALPHABET[n % ALPHABET.length] + id
		n = floor(n / ALPHABET.length) - 1
	} while (n >= 0)
	last_id_count += 1
	return id
}

/**
 * @param   {number} index
 * @returns {Vec2}   */
function idx_num_to_vec(index) {
	const vec = new Vec2()
	vec.x = index % GRID_WIDTH
	vec.y = floor(index / GRID_WIDTH)
	return vec
}

/**
 * @param   {Vec2}   pos
 * @returns {number} */
function idx_vec_to_num(pos) {
	return pos.y * GRID_WIDTH + pos.x
}

/**
 * @param   {Vec2}   pos
 * @returns {number} */
function pos_to_idx(pos) {
	let x = floor(pos.x / CELL_SIZE)
	if (x < 0 || x >= GRID_WIDTH) {
		return -1
	}
	let y = floor((pos.y - (x+1) % 2 * CELL_SIZE/2) / CELL_SIZE)
	if (y < 0 || y >= GRID_WIDTH) {
		return -1
	}
	return y * GRID_WIDTH + x
}

/**
 * @param   {Vec2} idx
 * @returns {Vec2} */
function idx_vec_to_pos(idx) {
	const pos = vec_prod_scalar(idx, CELL_SIZE)
	pos.y += CELL_SIZE/2 * ((idx.x+1) % 2)
	return pos
}
/**
 * @param   {number} idx
 * @returns {Vec2}   */
function idx_num_to_pos(idx) {
	const pos = idx_num_to_vec(idx)
	vec_mul_scalar(pos, CELL_SIZE)
	pos.y += CELL_SIZE/2 * ((idx % GRID_WIDTH + 1) % 2)
	return pos
}
/**
 * @param   {number} idx
 * @returns {Vec2}   */
function idx_num_to_pos_center(idx) {
	const pos = idx_num_to_pos(idx)
	pos.x += CELL_SIZE/2
	pos.y += CELL_SIZE/2
	return pos
}
/**
 * @param   {Node} node
 * @returns {Vec2} */
function node_to_pos_center(node) {
	return vec_sum_scalar(node.pos, CELL_SIZE/2)
}


/**
 * @param   {number} n
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
 * @param   {Vec2}   v
 * @returns {string} */
function vec_string(v) {
	return `${num_string(v.x)}, ${num_string(v.y)}`
}

/**
 * @param   {Ctx2D}  ctx
 * @param   {Rect}   rect
 * @param   {number} r
 * @returns {void}   */
function draw_rect_rounded(ctx, rect, r) {
	let {x, y, w, h} = rect
	ctx.beginPath()
	ctx.moveTo(x + r, y)
	ctx.arcTo(x+w, y  , x+w, y+h, r)
	ctx.arcTo(x+w, y+h, x  , y+h, r)
	ctx.arcTo(x  , y+h, x  , y  , r)
	ctx.arcTo(x  , y  , x+w, y  , r)
}

/**
 * @param   {Ctx2D}  ctx
 * @param   {Vec2}   a
 * @param   {Vec2}   b
 * @returns {void}   */
function draw_arc_between(ctx, a, b) {
	ctx.beginPath()
	let arc = get_arc_between(a, b)
	ctx.arc(arc.x, arc.y, arc.r, arc.start, arc.end)
}

/**
 * @param   {State} s
 * @param   {number} x
 * @param   {number} y
 * @returns {void}   */
function add_draw_point(s, x, y) {
	s.draw_points[s.draw_len+0] = x
	s.draw_points[s.draw_len+1] = y
	if (s.draw_len >= DRAW_POINTS_MAX - 2) {
		for (let i = 0; i < DRAW_POINTS_MAX - 2; i += 2) {
			s.draw_points[i+0] = s.draw_points[i+2]
			s.draw_points[i+1] = s.draw_points[i+3]
		}
	} else {
		s.draw_len += 2
	}
}

/**
 * @param   {State } s 
 * @param   {number} delta 
 * @returns {void}   */
function frame(s, delta) { // TODO: use delta
	s.ctx.clearRect(0, 0, s.canvas_width * s.dpr, s.canvas_height * s.dpr)

	let mouse_idx  = pos_to_idx(s.mouse)
	let mouse_node = node_at(s, mouse_idx)

	let mouse_node_center = idx_num_to_pos_center(mouse_idx)
	let mouse_in_center   = vec_distance(mouse_node_center, s.mouse) < NODE_SWAP_THRESHOLD
	

	switch (true) {
	case s.mouse_down && !s.dragging && !s.drawing:

		// is hoverig node
		if (mouse_node.id !== "" && is_pos_in_node(s.mouse, mouse_node)) {
			// start dragging
			s.drag_node      = mouse_node
			s.drag_start_idx = mouse_idx
			s.dragging       = true
		} else {
			// start drawing
			s.drawing = true
			add_draw_point(s, s.mouse.x, s.mouse.y)
		}

		break
	case !s.mouse_down && s.dragging:
		// add connection
		if (!is_connected(s, s.drag_node, mouse_node)) {
			connect_nodes(s, s.drag_node, mouse_node)
		}

		// stop dragging
		s.drag_node      = make_node()
		s.drag_start_idx = -1
		s.dragging       = false
		s.swaps_len      = 0
		break
	case s.mouse_down && s.drawing:
		// continue drawing
		add_draw_point(s, s.mouse.x, s.mouse.y)

		// check collisions with edges

		let start_x = s.draw_points[s.draw_len-4]
		let start_y = s.draw_points[s.draw_len-3]
		let end_x   = s.draw_points[s.draw_len-2]
		let end_y   = s.draw_points[s.draw_len-1]

		let start = vec2(start_x, start_y)
		let end   = vec2(end_x, end_y)

		for (let edge of s.edges) {
			let a_pos = node_to_pos_center(edge.a)
			let b_pos = node_to_pos_center(edge.b)

			if (!edge.intersecting_draw) {
				// edge.intersecting_draw = segments_intersecting(start, end, a_pos, b_pos)
				edge.intersecting_draw = arc_segment_intersecting(get_arc_between(a_pos, b_pos), start, end)
			}
		}
		break
	case !s.mouse_down && s.draw_len > 0:
		// stop drawing
		s.draw_len = 0
		s.drawing  = false

		// cut edges
		for (let i = s.edges.length - 1; i >= 0; i -= 1) {
			if (s.edges[i].intersecting_draw) {
				s.edges.splice(i, 1)
			}
		}

		break
	case s.mouse_down && s.drag_node.idx !== -1 && mouse_node.idx !== s.drag_node.idx:

		if (mouse_in_center || mouse_node.id === "") {
			if (mouse_idx === -1) {
				// stop dragging that node
				s.drag_node = make_node()
				break
			}

			// move node
			let from_idx = s.drag_node.idx
			let to_node  = node_at(s, mouse_idx)
	
			s.grid[from_idx]  = to_node
			s.grid[mouse_idx] = s.drag_node
			s.drag_node.idx   = mouse_idx
	
			// try to reduce changing positins of other nodes while dragging
			// previous swaps will be undone, if the space is now free
	
			for (let i = s.swaps_len - 2; i >= 0; i -= 2) {
				let from = s.swaps[i+0]
				let to   = s.swaps[i+1]
				let from_node = node_at(s, from)
				let to_node   = node_at(s, to)
				if (to_node.idx === -1) {
					console.assert(from_node.id !== "")
					from_node.idx = to
					s.grid[to]    = from_node
					s.grid[from]  = to_node
					s.swaps_len  -= 2
				}
			}

			// swap
	
			if (to_node.id !== "") {
				s.swaps[s.swaps_len+0] = from_idx
				s.swaps[s.swaps_len+1] = mouse_idx
				s.swaps_len += 2
				to_node.idx = from_idx
			}
		} else {
			// draw connect indicator

			let drag_node_pos = node_to_pos_center(s.drag_node)
			let mouse_pos     = idx_num_to_pos(mouse_idx)

			s.ctx.beginPath()
			s.ctx.moveTo(drag_node_pos.x, drag_node_pos.y)
			s.ctx.lineTo(mouse_pos.x + CELL_SIZE/2, mouse_pos.y + CELL_SIZE/2)
			s.ctx.strokeStyle = BLUE
			s.ctx.lineWidth   = 8
			s.ctx.lineCap     = "round"
			s.ctx.stroke()
		}

		break
	}

	// Draw grid dots

	for (let idx = 0; idx < GRID_ALL_CELLS; idx += 1) {
		let offset = idx_num_to_pos_center(idx)

		s.ctx.fillStyle = BLACK + "20"
		s.ctx.beginPath()
		s.ctx.arc(offset.x, offset.y, 6, 0, TAU)
		s.ctx.fill()
	}

	// Draw hover cell

	if (mouse_idx !== -1) {
		let pos = idx_num_to_pos(mouse_idx)
		draw_rect_rounded(s.ctx, rect(pos.x, pos.y, CELL_SIZE, CELL_SIZE), 10)
		s.ctx.fillStyle = BLACK + "10"
		s.ctx.fill()
	}

	// Draw edges

	s.ctx.lineWidth   = 4
	s.ctx.lineCap     = "round"

	for (let edge of s.edges) {
		console.assert(edge.a.idx !== -1 && edge.b.idx !== -1)
		console.assert(edge.a !== edge.b)
		let a_pos = node_to_pos_center(edge.a)
		let b_pos = node_to_pos_center(edge.b)

		// s.ctx.beginPath()
		// s.ctx.moveTo(a_pos.x, a_pos.y)
		// const t = bounce(abs(a_pos.x - b_pos.x) / CELL_SIZE + 1, 0, 1)
		// s.ctx.bezierCurveTo(
			// 	b_pos.x + CELL_SIZE/2 * t, a_pos.y,
			// 	a_pos.x + CELL_SIZE/2 * t, b_pos.y,
			// 	b_pos.x, b_pos.y,
			// )
		// s.ctx.lineTo(b_pos.x, b_pos.y)
		draw_arc_between(s.ctx, a_pos, b_pos)
		s.ctx.strokeStyle = edge.intersecting_draw ? RED : ORANGE
		s.ctx.stroke()
	}

	// Draw nodes

	s.ctx.font         = "24px sans-serif"
	s.ctx.textAlign    = "center"
	s.ctx.textBaseline = "middle"

	for (let node of s.nodes) {
		console.assert(node.idx !== -1)

		// keep dragged node on mouse pos
		// and the rest, snapped to grid
		let goal = s.drag_node === node
			? vec_diff_scalar(s.mouse, CELL_SIZE/2)
			: idx_num_to_pos(node.idx)
		
		let diff = vec_diff(goal, node.pos)
		vec_mul_scalar(diff, 0.22)
		vec_add(node.pos, diff)

		draw_rect_rounded(s.ctx, node_rect(node), 10)
		s.ctx.fillStyle = BLACK + (s.drag_node === node ? "ff" : "dd")
		s.ctx.fill()

		s.ctx.fillStyle = WHITE
		s.ctx.fillText(node.id, node.pos.x + CELL_SIZE/2, node.pos.y + CELL_SIZE/2)
	}

	// Draw drawing

	if (s.draw_len > 0) {
		s.ctx.strokeStyle = BLUE
		s.ctx.lineWidth   = 4
		s.ctx.lineCap     = "round"

		s.ctx.beginPath()
		s.ctx.moveTo(s.draw_points[0], s.draw_points[1])
		for (let i = 2; i < s.draw_len; i += 2) {
			s.ctx.lineTo(s.draw_points[i], s.draw_points[i+1])
		}
		s.ctx.stroke()
	}

	// Debug

	{
		let margin = 10
		let text_i = 0
		s.ctx.fillStyle    = BLACK
		s.ctx.font         = "16px monospace"
		s.ctx.textAlign    = "left"
		s.ctx.textBaseline = "top"
		s.ctx.fillText(`mouse:           ${vec_string(s.mouse)}`, margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_idx:       ${mouse_idx}`          , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_down:      ${s.mouse_down}`       , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`drag_node_idx:   ${s.drag_node.idx}`    , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_in_center: ${mouse_in_center}`    , margin, margin + (text_i++) * 20)

		let swaps_text = "swaps:         "
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

	s.grid = Array.from({length: GRID_ALL_CELLS}, make_node)

	s.nodes = new Array(16)
	for (let i = 0; i < 16; i += 1) {

		let grid_idx = 0
		do grid_idx = random_int(0, GRID_ALL_CELLS)
		while (s.grid[grid_idx].id !== "")

		let node         = make_node()
		node.id          = new_id()
		node.idx         = grid_idx
		node.pos         = idx_num_to_pos(grid_idx)
		s.nodes[i]       = node
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
		s.mouse.x = (e.clientX - s.canvas_left) * dpr
		s.mouse.y = (e.clientY - s.canvas_top ) * dpr
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
