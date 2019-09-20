// Click on canvas to start a polygon
// - Max 8 vertices
// - Only convex polygons
// - Esc cancel polygon

//Wasming
// compile: GOOS=js GOARCH=wasm go build -o main.wasm ./main.go
package main

import (
	"math"
	"math/rand"
	"syscall/js"
	// "syscall/js"
)

const (
	PI float32 = 3.14
)

var (
	width      float64
	height     float64
	ctx        js.Value
	simSpeed   float64 = 1
	worldScale float64 = 0.0125 // 1/8
)

// 重力加速度
var acceleration float64 = 0.25

// 弹性碰撞 速率衰减
var elasticCollision float64 = 0.999

type IParticle interface {
	Draw()
	Move()
}

type Coordinate struct {
	x float64
	y float64
}

type Particle struct {
	x     float64
	y     float64
	vx    float64
	vy    float64
	color string
	r     float32
}

func createParticle(edge Coordinate, speed Coordinate, color string, r float32) Particle {
	rx, ry, r1, r2 := rand.Float64(), rand.Float64(), rand.Float64(), rand.Float64()
	var vx, vy float64

	if r1 > 0.5 {
		vx = rx * speed.x
	} else {
		vx = -rx * speed.x
	}

	if r2 > 0.5 {
		vy = ry * speed.y
	} else {
		vy = -ry * speed.y
	}

	return Particle{
		x:     rx * edge.x,
		y:     ry * edge.y,
		vx:    vx,
		vy:    vy,
		color: color,
		r:     r,
	}
}

func (this *Particle) Draw(ctx js.Value) {
	ctx.Set("fillStyle", this.color)
	ctx.Call("beginPath")
	/**
	* arc(x, y, radius, startAngle, endAngle, anticlockwise)
	 */
	ctx.Call("arc", this.x, this.y, this.r, 0, 2*PI)
	ctx.Call("fill")
}

func (this *Particle) Move(edge Coordinate) {
	this.x += this.vx
	this.y += this.vy

	// this.vy *= this.elasticCollision
	// this.vy += this.acceleration

	if this.x >= edge.x || this.x <= 0 {
		this.vx = -this.vx
	}

	if this.y >= edge.y || this.y <= 0 {
		this.vy = -this.vy
	}
}

func line(ctx js.Value, p Particle, q Particle, color string, maxDistance float64) {
	d := math.Sqrt((p.x-q.x)*(p.x-q.x) + (p.y-q.y)*(p.y-q.y))

	if d <= maxDistance {
		ctx.Set("strokeStyle", color)
		ctx.Call("beginPath")
		ctx.Call("moveTo", p.x, p.y)
		ctx.Call("lineTo", q.x, q.y)
		ctx.Call("stroke")
	}
}

func drawLine(ctx js.Value, particles []Particle) {
	len := len(particles)

	for i := 0; i < len; i++ {
		p := particles[i]

		for j := i + 1; j < len; j++ {
			line(ctx, p, particles[j], "#d9d9d9", 60)
		}
	}
}

func initialDraw(ctx js.Value, edge Coordinate, canvas js.Value) {
	total := 200
	particles := make([]Particle, total)
	mouseParticle := createParticle(edge, Coordinate{x: 0, y: 0}, "#f0f", 2)

	for i := 0; i < total-1; i++ {
		particles[i] = createParticle(edge, Coordinate{x: 0, y: 0}, "#f0f", 2)
	}

	particles[total-1] = mouseParticle

	handleMousemove := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		e := args[0]
		x, y := e.Get("ClientX"), e.Get("ClientX")

		mouseParticle.x = x.Float()
		mouseParticle.y = y.Float()

		return nil
	})

	canvas.Call("addEventListener", "mousemove", handleMousemove)

	draw := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		ctx.Set("fillStyle", "rgba(255,255,255,0.3)")
		ctx.Call("fillRect", 0, 0, edge.x, edge.y)
		// ctx.clearRect(0, 0, edge.x, edge.y);

		for i := 0; i < total; i++ {
			particles[i].Draw(ctx)
			particles[i].Move(edge)
		}

		drawLine(ctx, particles)

		return nil
	})

	js.Global().Call("requestAnimationFrame", draw)
}

func initial(app js.Value) {
	document := js.Global().Get("document")
	canvas := document.Call("createElement", "canvas")
	edge := Coordinate{
		x: app.Get("clientWidth").Float(),
		y: app.Get("clientHeight").Float(),
	}

	canvas.Set("width", edge.x)
	canvas.Set("height", edge.y)
	app.Call("appendChild", canvas)

	ctx := canvas.Call("getContext", "2d")
	initialDraw(ctx, edge, canvas)
}

func main() {
	document := js.Global().Get("document")
	app := document.Call("getElementById", "app")

	done := make(chan struct{}, 0)

	initial(app)

	<-done
}
