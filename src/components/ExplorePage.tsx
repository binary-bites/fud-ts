import Post from '../../backend/models/postModel.ts'

function Card() {

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=" alt="Food" /></figure>
            <div className="card-body">
                <h2 className="card-title">Yumbly foods</h2>
                <p>Boy, I bet you want to eat this!</p>
            </div>
        </div>
    )
}

export default function ExplorePage() {
    return (
        <div className="m-5">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}
