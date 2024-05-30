const TAU    = 6.283185307179586
const PI     = Math.PI
const SQRT2  = Math.SQRT2

const max    = Math.max
const min    = Math.min
const abs    = Math.abs
const sign   = Math.sign
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
const exp    = Math.exp

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


/**
 * @param   {number} a
 * @param   {number} b
 * @param   {number} t
 * @returns {number} */
function lerp(a, b, t) {
	return a + (b-a) * t
}

const DT_FIXED = 16.666666666666668

/**
 * @param   {number} a
 * @param   {number} b
 * @param   {number} decay
 * @param   {number} [dt]
 * @returns {number} */
function exp_decay(a, b, decay, dt = DT_FIXED) {
	return b + (a-b) * exp(-decay * (dt/DT_FIXED))
}

/**
 * @param   {number} value
 * @param   {number} target
 * @param   {number} max_delta
 * @returns {number} */
function move_towards(value, target, max_delta) {
	return value + sign(target - value) * min(abs(target - value), max_delta)
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
 * @param   {Vec2}   a receiving
 * @param   {Vec2}   b
 * @param   {number} t
 * @returns {void}   */
function vec_lerp(a, b, t) {
	a.x = lerp(a.x, b.x, t)
	a.y = lerp(a.y, b.y, t)
}
/**
 * @param   {Vec2}   a receiving
 * @param   {Vec2}   b
 * @param   {number} decay
 * @param   {number} [dt]
 * @returns {void}   */
function vec_exp_decay(a, b, decay, dt) {
	a.x = exp_decay(a.x, b.x, decay, dt)
	a.y = exp_decay(a.y, b.y, decay, dt)
}
/**
 * @param   {Vec2}   a
 * @param   {Vec2}   b
 * @returns {number} */
function cross(a, b) {
	return a.x * b.y - a.y * b.x
}

class Circle extends Vec2 {
	r = 0
}
class Arc extends Circle {
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
 * @param   {Vec2}   a
 * @param   {Vec2}   b
 * @param   {Vec2}   c
 * @returns {number} */
function angle_triangle(a, b, c) {
	let angle = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
	// ensure the angle is between 0 and 2π
	if (angle < 0) {
		angle += TAU
	}
	// Ensure the angle is no more than π
	if (angle > PI) {
		angle -= TAU
	}
	return angle
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
 * @param   {number} rad
 * @returns {number} */
function rad_to_deg(rad) {
	return rad * 180 / PI
}

/**
 * @param   {number} angle
 * @returns {string} */
function angle_to_string(angle) {
	return `${rad_to_deg(angle).toFixed(2)}°`
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
 * @param   {Circle} circle
 * @param   {Vec2}   start
 * @param   {Vec2}   end
 * @returns {Vec2[]} */
function circle_segment_intersection_points(circle, start, end) {
    let v1x = end.x   - start.x
    let v1y = end.y   - start.y
    let v2x = start.x - circle.x
    let v2y = start.y - circle.y

    let b = -2 * (v1x * v2x + v1y * v2y)
    let c =  2 * (v1x * v1x + v1y * v1y)
    let d = sqrt(b * b - 2 * c * (v2x * v2x + v2y * v2y - circle.r * circle.r))

    if (isNaN(d)) { // no intercept
        return []
    }

	// these represent the unit distance of point one and two on the line
    let u1 = (b - d) / c
    let u2 = (b + d) / c

	/** @type {Vec2[]} */
	let points = []
	
    if (u1 <= 1 && u1 >= 0) {
		points.push(vec2(start.x + v1x * u1, start.y + v1y * u1))
    }
    if (u2 <= 1 && u2 >= 0) {
		points.push(vec2(start.x + v1x * u2, start.y + v1y * u2))
    }       

    return points
}

/**
 * @param   {Arc}             arc
 * @param   {Vec2}            start
 * @param   {Vec2}            end
 * @returns {[Vec2, boolean]} */
function arc_segment_intersection_point(arc, start, end) {
    let v1x = end.x   - start.x
    let v1y = end.y   - start.y
    let v2x = start.x - arc.x
    let v2y = start.y - arc.y

    let b = -2 * (v1x * v2x + v1y * v2y)
    let c =  2 * (v1x * v1x + v1y * v1y)
    let d = sqrt(b * b - 2 * c * (v2x * v2x + v2y * v2y - arc.r * arc.r))

    if (isNaN(d)) { // no intercept
        return [new Vec2(), false]
    }

	// these represent the unit distance of point one and two on the line
    let u1 = (b - d) / c
    let u2 = (b + d) / c

	let p = new Vec2()
	let angle = 0
	
    if (u1 <= 1 && u1 >= 0) {
		p.x = start.x + v1x * u1
		p.y = start.y + v1y * u1
		angle = vec_angle(arc, p)
		if (angle_in_range(angle, arc.start, arc.end)) {
			return [p, true]
		}
    }
    if (u2 <= 1 && u2 >= 0) {
		p.x = start.x + v1x * u2
		p.y = start.y + v1y * u2
		angle = vec_angle(arc, p)
		if (angle_in_range(angle, arc.start, arc.end)) {
			return [p, true]
		}
    }       

    return [new Vec2(), false]
}

/**
 * @param   {Arc}    arc
 * @param   {Circle} circle
 * @returns {boolean} */
function arc_circle_intersecting(arc, circle) {
	let dx   = circle.x - arc.x
    let dy   = circle.y - arc.y
    let dist = sqrt(dx * dx + dy * dy)

	// if the circle is completely inside or outside the arc
    if (dist < arc.r - circle.r || dist > arc.r + circle.r) {
		return false
    }

	let start = arc.start % TAU
	let end   = arc.end   % TAU

    let start_x = arc.x + arc.r * cos(start)
    let start_y = arc.y + arc.r * sin(start)
    let end_x   = arc.x + arc.r * cos(end)
    let end_y   = arc.y + arc.r * sin(end)

	let diff_start_x = start_x - circle.x
	let diff_start_y = start_y - circle.y
	let diff_end_x   = end_x   - circle.x
	let diff_end_y   = end_y   - circle.y

    return (diff_start_x * diff_start_x + diff_start_y * diff_start_y <= circle.r * circle.r) ||
           (diff_end_x   * diff_end_x   + diff_end_y   * diff_end_y   <= circle.r * circle.r)
}

/**
 * @param   {Circle} A
 * @param   {Circle} B
 * @returns {[Vec2, Vec2, boolean]} */
function circle_circle_intersection_point(A, B) {
	let dx = B.x - A.x
	let dy = B.y - A.y
	let d = sqrt((dy*dy) + (dx*dx))

	if (
		d > (A.r + B.r) || // circles do not intersect
		d < abs(A.r - B.r) // one circle is contained in the other
	) {
		return [new Vec2(), new Vec2(), false]
	}

	/*
	C is the point where the line through the circle
	intersection points crosses the line between the circle
	centers.
	*/

	// the distance from A to C
	let c = (A.r*A.r - B.r*B.r + d*d) / (2*d)

	// coordinates of C
	let cx = A.x + dx * c/d
	let cy = A.y + dy * c/d

	// the distance from C to either of the intersection points
	let h = sqrt(A.r*A.r - c*c)

	// the offsets of the intersection points from C
	let rx = -dy * (h/d)
	let ry =  dx * (h/d)

	return [
		vec2(cx + rx, cy + ry),
		vec2(cx - rx, cy - ry),
		true,
	]
}

/**
 * @param   {Arc} A
 * @param   {Arc} B
 * @returns {[Vec2, boolean]} */
function arc_arc_intersection_point(A, B) {
	let [p1, p2, intersecting] = circle_circle_intersection_point(A, B)
	if (intersecting) {
		if (angle_in_range(vec_angle(A, p1), A.start, A.end) && angle_in_range(vec_angle(B, p1), B.start, B.end)) {
			return [p1, true]
		}
		if (angle_in_range(vec_angle(A, p2), A.start, A.end) && angle_in_range(vec_angle(B, p2), B.start, B.end)) {
			return [p2, true]
		}
	}
	
	return [new Vec2(), false]
}

/**
 * @param   {Arc}             arc
 * @param   {Rect}            rect
 * @returns {[Vec2, boolean]} */
function arc_rect_intersection_point(arc, rect) {
	// check north
	let [p, intersecting] = arc_segment_intersection_point(arc, vec2(rect.x, rect.y), vec2(rect.x + rect.w, rect.y))
	if (intersecting) {
		return [p, true]
	}

	// check east
	[p, intersecting] = arc_segment_intersection_point(arc, vec2(rect.x + rect.w, rect.y), vec2(rect.x + rect.w, rect.y + rect.h))
	if (intersecting) {
		return [p, true]
	}

	// check south
	[p, intersecting] = arc_segment_intersection_point(arc, vec2(rect.x + rect.w, rect.y + rect.h), vec2(rect.x, rect.y + rect.h))
	if (intersecting) {
		return [p, true]
	}

	// check west
	[p, intersecting] = arc_segment_intersection_point(arc, vec2(rect.x, rect.y + rect.h), vec2(rect.x, rect.y))
	if (intersecting) {
		return [p, true]
	}

	return [new Vec2(), false]
}

/**
 * @param   {Arc}             arc
 * @param   {Rect}            rect
 * @param   {number}          radius
 * @returns {[Vec2, boolean]} */
function arc_rect_rounded_intersection_point(arc, rect, radius) {
	// check north
	let [p, intersecting] = arc_segment_intersection_point(arc,
		vec2(rect.x + radius         , rect.y),
		vec2(rect.x + rect.w - radius, rect.y),
	)
	if (intersecting) return [p, true]

	// check east
	;[p, intersecting] = arc_segment_intersection_point(arc,
		vec2(rect.x + rect.w         , rect.y + radius),
		vec2(rect.x + rect.w         , rect.y + rect.h - radius),
	)
	if (intersecting) return [p, true]

	// check south
	;[p, intersecting] = arc_segment_intersection_point(arc,
		vec2(rect.x + radius         , rect.y + rect.h),
		vec2(rect.x + rect.w - radius, rect.y + rect.h),
	)
	if (intersecting) return [p, true]

	// check west
	;[p, intersecting] = arc_segment_intersection_point(arc,
		vec2(rect.x                  , rect.y + radius),
		vec2(rect.x                  , rect.y + rect.h - radius),
	)
	if (intersecting) return [p, true]

	let corner = new Arc()
	corner.r     = radius

	// check north-west
	corner.x     = rect.x + radius
	corner.y     = rect.y + radius
	corner.start = PI
	corner.end   = PI + PI/2
	;[p, intersecting] = arc_arc_intersection_point(arc, corner)
	if (intersecting) return [p, true]

	// check north-east
	corner.x     = rect.x + rect.w - radius
	corner.y     = rect.y + radius
	corner.start = PI + PI/2
	corner.end   = 0
	;[p, intersecting] = arc_arc_intersection_point(arc, corner)
	if (intersecting) return [p, true]

	// check south-east
	corner.x     = rect.x + rect.w - radius
	corner.y     = rect.y + rect.h - radius
	corner.start = 0
	corner.end   = PI/2
	;[p, intersecting] = arc_arc_intersection_point(arc, corner)
	if (intersecting) return [p, true]

	// check south-west
	corner.x     = rect.x + radius
	corner.y     = rect.y + rect.h - radius
	corner.start = PI/2
	corner.end   = PI
	;[p, intersecting] = arc_arc_intersection_point(arc, corner)
	if (intersecting) return [p, true]

	return [new Vec2(), false]
}

/**
 * @param   {Vec2}   a
 * @param   {Vec2}   b
 * @param   {number} dist
 * @returns {Arc}    */
function arc_between(a, b, dist) {
	if (dist < 0) {
		[a, b] = [b, a]
		dist   = -dist
	}

	if (dist === 0) {
		let arc = new Arc()
		arc.x     = (a.x + b.x) / 2
		arc.y     = (a.y + b.y) / 2
		arc.r     = vec_distance(a, b) / 2
		arc.start = atan2(b.y - a.y, b.x - a.x)
		arc.end   = arc.start + PI
		return arc
	}
	
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

/**
 * @param   {number} radius
 * @param   {number} w_original
 * @param   {number} w_scaled
 * @returns {number} */
function scale_border_radius(radius, w_original, w_scaled) {
	return (w_scaled - (w_original - radius * 2)) / 2
}

const ORANGE = "#fcab54"
const RED    = "#E61400"
const BLUE   = "#0050BE"
const WHITE  = "#f6eee0"
const BLACK  = "#1a1a1a"

const CELL_SIZE           = 100
const CELL_DIAGONAL       = SQRT2 * CELL_SIZE

const NODE_SIZE	          = 70
const NODE_DIAGONAL	      = SQRT2 * NODE_SIZE
const NODE_MARGIN	      = (CELL_SIZE - NODE_SIZE) / 2
const NODE_SWAP_THRESHOLD = 0.5 * sqrt((CELL_SIZE/2) * (CELL_SIZE/2))
const NODE_BORDER_RADIUS  = 10
const CELL_BORDER_RADIUS  = scale_border_radius(NODE_BORDER_RADIUS, NODE_SIZE, CELL_SIZE)

// distance between the edge end and the node
const EDGE_MARGIN_MIN	  = 6
const EDGE_MARGIN_MAX	  = 12
const GRID_W_CELLS        = 64
const GRID_ALL_CELLS      = GRID_W_CELLS * GRID_W_CELLS
const DRAW_POINTS_MAX     = 32


/** @typedef {CanvasRenderingContext2D} Ctx2D */

/** @enum {typeof Interaction_Mode[keyof typeof Interaction_Mode]} */
const Interaction_Mode = /** @type {const} */({
	Default:   0,
	Drag_Node: 1,
	Draw:      2,
	Move:      3,
})
/** @type {Record<Interaction_Mode, string>} */
const interaction_mode_string_map = {
	[Interaction_Mode.Default]:   "Default",
	[Interaction_Mode.Drag_Node]: "Drag Node",
	[Interaction_Mode.Draw]:      "Draw",
	[Interaction_Mode.Move]:      "Move",
}
/**
 * @param   {Interaction_Mode} mode
 * @returns {string} */
function interaction_mode_string(mode) {
	return interaction_mode_string_map[mode]
}

class State {
	// inputs
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
	space_down    = false
	// serializable state
	nodes         = /** @type {Node[]} */ ([])
	edges         = /** @type {Edge[]} */ ([])
	// temporary state
	grid          = /** @type {Node[]} */ ([])
	mode		  = /** @type {Interaction_Mode} */ (Interaction_Mode.Default)
	mouse_prev    = /** @type {null | Vec2} */ (null) // used by move mode
	camera_pos	  = new Vec2()
	drag_node     = new Node()
	drag_start_idx= -1
	swaps         = /** @type {number[]} */(new Array(100))
	swaps_len     = 0
	draw_points   = new Float64Array(DRAW_POINTS_MAX)
	draw_len	  = 0
}

/**
 * @param   {State} s
 * @returns {void}  */
function init_state_mock(s) {
	init_empty_grid(s)
	
	const NODES = 24
	s.nodes = new Array(NODES)
	for (let i = 0; i < NODES; i += 1) {

		let grid_idx = 0
		do grid_idx = random_int(0, GRID_ALL_CELLS)
		while (s.grid[grid_idx].id !== "")

		let node         = new Node()
		node.id          = new_id()
		node.idx         = grid_idx
		s.nodes[i]       = node
		s.grid[grid_idx] = s.nodes[i]
	}

	const EDGES = 16
	s.edges = new Array(EDGES)
	for (let i = 0; i < EDGES; i += 1) {
		let a_idx = random_int(0, s.nodes.length-1)
		let b_idx = random_int(a_idx+1, s.nodes.length)

		s.edges[i] = edge(s.nodes[a_idx], s.nodes[b_idx])
	}

	_state_after_init(s)
}

/**
 * @param   {State} s
 * @returns {void}  */
function init_empty_grid(s) {
	s.grid = new Array(GRID_ALL_CELLS)
	for (let i = 0; i < GRID_ALL_CELLS; i++) {
		s.grid[i] = new Node()
	}
}

/**
 * @param   {State}  s
 * @returns {string} */
function state_serialize(s) {
	let nodes = []
	for (let node of s.nodes) {
		nodes.push(node.id)
		nodes.push(node.idx)
	}
	let edges = []
	for (let edge of s.edges) {
		edges.push(edge.a.id)
		edges.push(edge.b.id)
	}
	let arr = [nodes, edges]
	return JSON.stringify(arr)
}

/**
 * @param   {State}  s
 * @param   {string} data
 * @returns {boolean}  */
function state_deserialize(s, data) {
	let arr = /** @type {unknown[]} */ (JSON.parse(data))
	if (!(Array.isArray(arr) && arr.length === 2)) return false

	let nodes = /** @type {unknown[]} */ (arr[0])
	let edges = /** @type {unknown[]} */ (arr[1])

	if (!Array.isArray(nodes) || !Array.isArray(edges)) return false

	if (nodes.length % 2 !== 0) return false
	if (edges.length % 2 !== 0) return false

	init_empty_grid(s)

	s.nodes = []
	for (let i = 0; i < nodes.length; i += 2) {
		let node = new Node()
		let id  = nodes[i+0]
		let idx = nodes[i+1]
		if (typeof id !== "string" || typeof idx !== "number") return false
		node.id  = id
		node.idx = idx
		s.nodes.push(node)
		s.grid[node.idx] = node
	}

	s.edges = []
	for (let i = 0; i < edges.length; i += 2) {
		let a_id = edges[i+0]
		let b_id = edges[i+1]
		if (typeof a_id !== "string" || typeof b_id !== "string") return false
		let a = node_find(s, a_id)
		let b = node_find(s, b_id)
		connect_nodes(s, a, b)
	}

	_state_after_init(s)

	return true
}

/**
 * @param   {State} s
 * @returns {void}  */
function _state_after_init(s) {
	update_edge_arches(s)

	for (let edge of s.edges) {
		edge.arc_t_draw = edge.arc_t
	}

	for (let node of s.nodes) {
		node.pos = idx_num_to_pos(node.idx)
	}

	// move the camera to the center of the grid
	s.camera_pos = vec2(GRID_W_CELLS * CELL_SIZE / 2, GRID_W_CELLS * CELL_SIZE / 2)
}

class Node {
	id  = ""
	pos = new Vec2()
	idx = -1
}
/**
 * @param   {State}  s
 * @param   {number} idx
 * @returns {Node}   */
function node_at(s, idx) {
	if (idx < 0 || idx >= GRID_ALL_CELLS) {
		return new Node()
	}
	return s.grid[idx]
}

/**
 * @param   {State}  s
 * @param   {string} id
 * @returns {Node}  */
function node_find(s, id) {
	if (id !== "") {
		for (let node of s.nodes) {
			if (node.id === id) {
				return node
			}
		}
	}
	return new Node()
}

/**
 * @param   {Node} node
 * @returns {boolean} */
function node_is_real(node) {
	return node.id !== ""
}

class Edge {
	a                 = new Node()
	b                 = new Node()
	intersecting_draw = false
	arc_t      = 0 // actual, for calculations
	arc_t_draw = 0 // interpolated, for drawing
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
 * @param   {number} idx
 * @returns {Rect}   */
function cell_rect(idx) {
	let pos = idx_num_to_pos(idx)
	let rect = new Rect()
	rect.x = pos.x
	rect.y = pos.y
	rect.w = CELL_SIZE
	rect.h = CELL_SIZE
	return rect
}

/**
 * node rect including the cell margin
 * (same rect as the cell, just positioned by the node.pos)
 * 
 * @param   {Node} node 
 * @returns {Rect} */
function node_cell_rect(node) {
	let rect = new Rect()
	rect.x = node.pos.x
	rect.y = node.pos.y
	rect.w = CELL_SIZE
	rect.h = CELL_SIZE
	return rect
}

/**
 * @param   {Node}   node
 * @param   {number} dist edge dist
 * @returns {Rect} */
function node_edge_rect(node, dist) {
	let t = 1 - min(CELL_DIAGONAL / dist, 1)
	let edge_margin = lerp(EDGE_MARGIN_MIN, EDGE_MARGIN_MAX, t)
	let rect = new Rect()
	rect.x = node.pos.x + NODE_MARGIN - edge_margin
	rect.y = node.pos.y + NODE_MARGIN - edge_margin
	rect.w = NODE_SIZE + 2*edge_margin
	rect.h = NODE_SIZE + 2*edge_margin
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
	vec.x = index % GRID_W_CELLS
	vec.y = floor(index / GRID_W_CELLS)
	return vec
}

/**
 * @param   {Vec2}   pos
 * @returns {number} */
function idx_vec_to_num(pos) {
	return pos.y * GRID_W_CELLS + pos.x
}

/**
 * @param   {Vec2}   pos
 * @returns {number} */
function pos_to_idx(pos) {
	let x = floor(pos.x / CELL_SIZE)
	if (x < 0 || x >= GRID_W_CELLS) {
		return -1
	}
	let y = floor((pos.y - (x+1) % 2 * CELL_SIZE/2) / CELL_SIZE)
	if (y < 0 || y >= GRID_W_CELLS) {
		return -1
	}
	return y * GRID_W_CELLS + x
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
	pos.y += CELL_SIZE/2 * ((idx % GRID_W_CELLS + 1) % 2)
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
 * @param   {number} dist
 * @returns {void}   */
function draw_arc_between(ctx, a, b, dist) {
	let arc = arc_between(a, b, dist)
	ctx.beginPath()
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

// /**
//  * @param   {Arc}      arc
//  * @returns {number[]} cell indices */
// function arc_to_intersecting_cells(arc) {
// 	let start_pos = vec2(arc.x + arc.r * cos(arc.start), arc.y + arc.r * sin(arc.start))
// 	let end_pos   = vec2(arc.x + arc.r * cos(arc.end),   arc.y + arc.r * sin(arc.end))

// 	let start_idx = pos_to_idx(start_pos)
// 	let end_idx   = pos_to_idx(end_pos)
	
// 	let cells = []
// 	let idx = start_idx
// 	let last = -1

// 	while (true) {
// 		if (idx === end_idx) {
// 			break
// 		}
// 		if (idx !== last) {
// 			cells.push(idx)
// 		}
// 		last = idx
// 		let pos = idx_num_to_vec(idx)
// 		let angle = vec_angle(arc, pos)
// 		let next_idx = idx
// 		let next_dist = Infinity
// 		for (let i = 0; i < 6; i += 1) {
// 			let next_pos = vec_moved(pos, angle + i * PI/3, 1)
// 			let next_idx = pos_to_idx(next_pos)
// 			let next_dist = vec_distance(next_pos, pos)
// 			if (next_dist < next_dist) {
// 				next_idx = next_idx
// 				next_dist = next_dist
// 			}
// 		}
// 		idx = next_idx
// 	}

// 	return cells
// }

/**
 * @param   {number} t
 * @returns {number} */
function edge_arc_t_to_multiplier(t) {
	let m = abs(t)
	m = 1 - pow(2, -11 * m) // ease out
	m = 20 * (1-m) + 0.1
	if (t < 0) {
		m = -m
	}
	return m
}

/**
 * edge arches are calculated to minimize edges overlapping with nodes
 * 
 * the algorithm tries multiple arc distances, and chooses the one with the least node overlap
 * 
 * TODO: could be optimized
 * 
 * @param   {State} s
 * @returns {void}  */
function update_edge_arches(s) {
	for (let edge of s.edges) {
		// use idx to get the center of the node
		// because the node position is interpolated
		let a_pos = idx_num_to_pos_center(edge.a.idx)
		let b_pos = idx_num_to_pos_center(edge.b.idx)

		let edge_dist = vec_distance(a_pos, b_pos)

		let arc_t_result    = 0
		let dist_acc_result = Infinity
		
		for (let i = 1; i < 2*12; i += 1) {
			let arc_t = i % 2 === 0 ? i : -i + 1
			arc_t /= 2*12

			// if nodes are close, prefer the edge to be a curve
			if (edge_dist < CELL_DIAGONAL) {
				arc_t = 1 - arc_t
			}

			let arc_dist = edge_dist * edge_arc_t_to_multiplier(arc_t)
			let arc = arc_between(a_pos, b_pos, arc_dist)

			let dist_acc = 0
	
			// TODO: only check nodes that are inside the arc, using the idx grid
			for (let node of s.nodes) {
				if (node === edge.a || node === edge.b) continue
	
				let node_pos = idx_num_to_pos_center(node.idx)

				// is inside arc
				if (!angle_in_range(vec_angle(arc, node_pos), arc.start, arc.end)) continue

				let node_arc_dist = abs(vec_distance(arc, node_pos) - arc.r)
				dist_acc += max(CELL_DIAGONAL/2 - node_arc_dist, 0)
			}

			if (dist_acc < NODE_MARGIN) {
				arc_t_result = arc_t
				break
			}

			if (dist_acc < dist_acc_result) {
				dist_acc_result = dist_acc
				arc_t_result = arc_t
			}
		}

		edge.arc_t = arc_t_result
	}
}

/**
 * @param   {State } s 
 * @param   {number} dt 
 * @returns {void}   */
function frame(s, dt) {

	let mouse_in_grid = vec2(
		(s.mouse.x - s.canvas_left) * s.dpr + s.camera_pos.x,
		(s.mouse.y - s.canvas_top ) * s.dpr + s.camera_pos.y,
	)

	let mouse_idx  = pos_to_idx(mouse_in_grid)
	let mouse_node = node_at(s, mouse_idx)

	let mouse_node_center = idx_num_to_pos_center(mouse_idx)
	let mouse_in_center   = vec_distance(mouse_node_center, mouse_in_grid) < NODE_SWAP_THRESHOLD

	switch (s.mode) {
	case Interaction_Mode.Default:
		if (s.mouse_down) {
			// is hoverig node
			if (mouse_node.id !== "" && is_pos_in_node(mouse_in_grid, mouse_node)) {
				// start dragging
				s.drag_node      = mouse_node
				s.drag_start_idx = mouse_idx
				s.mode           = Interaction_Mode.Drag_Node
			} else {
				// start drawing
				s.mode = Interaction_Mode.Draw
				add_draw_point(s, mouse_in_grid.x, mouse_in_grid.y)
			}
			break
		}

		if (s.space_down) {
			s.mode = Interaction_Mode.Move
			break
		}

		break
	case Interaction_Mode.Drag_Node:
		if (!s.mouse_down) {
			// add connection
			if (!is_connected(s, s.drag_node, mouse_node)) {
				connect_nodes(s, s.drag_node, mouse_node)
				update_edge_arches(s)
			}

			// stop dragging
			s.drag_node      = new Node()
			s.drag_start_idx = -1
			s.mode           = Interaction_Mode.Default
			s.swaps_len      = 0

			break
		}

		if (s.drag_node.idx === -1 || mouse_node.idx === s.drag_node.idx) {
			break
		}
		
		if (mouse_in_center || mouse_node.idx === -1) {
			if (mouse_idx === -1) {
				// stop dragging that node
				s.drag_node = new Node()
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

			update_edge_arches(s)
		}

		break
	case Interaction_Mode.Draw:
		if (!s.mouse_down) {
			// stop drawing
			s.draw_len = 0
			s.mode     = Interaction_Mode.Default

			// cut edges
			for (let i = s.edges.length - 1; i >= 0; i -= 1) {
				if (s.edges[i].intersecting_draw) {
					s.edges.splice(i, 1)
				}
			}

			break
		}

		
		// continue drawing
		add_draw_point(s, mouse_in_grid.x, mouse_in_grid.y)

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

				let dist = vec_distance(a_pos, b_pos) * edge_arc_t_to_multiplier(edge.arc_t_draw)
				let arc = arc_between(a_pos, b_pos, dist)
				edge.intersecting_draw = arc_segment_intersecting(arc, start, end)
			}
		}

		break
	case Interaction_Mode.Move:
		if (!s.space_down) {
			s.mouse_prev = null
			s.mode = Interaction_Mode.Default
			break
		}

		if (s.mouse_down) {
			if (s.mouse_prev === null) {
				s.mouse_prev = new Vec2()
			} else {
				s.camera_pos.x += s.mouse_prev.x - s.mouse.x
				s.camera_pos.y += s.mouse_prev.y - s.mouse.y
			}
			s.mouse_prev.x = s.mouse.x
			s.mouse_prev.y = s.mouse.y
		} else {
			s.mouse_prev = null
		}

		break
	}

	// Camera

	s.ctx.clearRect(0, 0, s.canvas_width * s.dpr, s.canvas_height * s.dpr)
	s.ctx.translate(-s.camera_pos.x, -s.camera_pos.y)


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
		draw_rect_rounded(s.ctx, rect(pos.x, pos.y, CELL_SIZE, CELL_SIZE), CELL_BORDER_RADIUS)
		s.ctx.fillStyle = BLACK + "10"
		s.ctx.fill()
	}

	// Draw edges

	s.ctx.lineWidth   = 6
	s.ctx.lineCap     = "round"

	for (let edge of s.edges) {
		console.assert(edge.a.idx !== -1 && edge.b.idx !== -1)
		console.assert(edge.a !== edge.b)
		let a_pos = node_to_pos_center(edge.a)
		let b_pos = node_to_pos_center(edge.b)
		let edge_dist  = vec_distance(a_pos, b_pos)

		edge.arc_t_draw = exp_decay(edge.arc_t_draw, edge.arc_t, 0.05, dt)

		let arc_dist = edge_dist * edge_arc_t_to_multiplier(edge.arc_t_draw)
		let arc = arc_between(a_pos, b_pos, arc_dist)

		let a_rect = node_edge_rect(edge.a, edge_dist)
		let b_rect = node_edge_rect(edge.b, edge_dist)

		let br = scale_border_radius(NODE_BORDER_RADIUS, NODE_SIZE, a_rect.w) // the same for both

		let [a_intersection] = arc_rect_rounded_intersection_point(arc, a_rect, br)
		let [b_intersection] = arc_rect_rounded_intersection_point(arc, b_rect, br)

		draw_arc_between(s.ctx, a_intersection, b_intersection, arc_dist)
		
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
			? vec_diff_scalar(mouse_in_grid, CELL_SIZE/2)
			: idx_num_to_pos(node.idx)
		
		vec_exp_decay(node.pos, goal, 0.22, dt)

		draw_rect_rounded(s.ctx, node_rect(node), NODE_BORDER_RADIUS)
		s.ctx.fillStyle = BLACK
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

	s.ctx.resetTransform()

	{
		let margin = 10
		let text_i = 0
		s.ctx.fillStyle    = BLACK
		s.ctx.font         = "16px monospace"
		s.ctx.textAlign    = "left"
		s.ctx.textBaseline = "top"
		s.ctx.fillText(`mode:            ${interaction_mode_string(s.mode)}`, margin, margin + (text_i++) * 20)
		s.ctx.fillText(`camera:          ${vec_string(s.camera_pos)}`       , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse:           ${vec_string(s.mouse)}`            , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_in_grid:   ${vec_string(mouse_in_grid)}`      , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_idx:       ${mouse_idx}`                      , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_down:      ${s.mouse_down}`                   , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`drag_node_idx:   ${s.drag_node.idx}`                , margin, margin + (text_i++) * 20)
		s.ctx.fillText(`mouse_in_center: ${mouse_in_center}`                , margin, margin + (text_i++) * 20)

		let swaps_text = "swaps:           "
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

	let serialized_state = localStorage.getItem("state")
	if (serialized_state && state_deserialize(s, serialized_state)) {
		// already initialized
	} else {
		init_state_mock(s)
	}

	// @ts-ignore
	window.state = s

	// serialize state on unload
	window.addEventListener("beforeunload", () => {
		localStorage.setItem("state", state_serialize(s))
	})

	// button for reseting state
	const reset_button = document.createElement("button")
	reset_button.textContent = "Reset"
	reset_button.style.position = "absolute"
	reset_button.style.top = "10px"
	reset_button.style.left = "10px"
	reset_button.addEventListener("click", () => {
		localStorage.removeItem("state")
		init_state_mock(s)
	})
	document.body.appendChild(reset_button)
	

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
		s.mouse.x = e.clientX
		s.mouse.y = e.clientY
	})
	window.addEventListener("pointerdown", e => {
		s.mouse_down = true
		s.mouse.x = e.clientX
		s.mouse.y = e.clientY
	})
	window.addEventListener("pointerup", e => {
		s.mouse_down = false
	})
	window.addEventListener("keydown", e => {
		switch (e.key) {
		case " ": s.space_down = true ;break
		}
	})
	window.addEventListener("keyup", e => {
		switch (e.key) {
		case " ": s.space_down = false ;break
		}
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
