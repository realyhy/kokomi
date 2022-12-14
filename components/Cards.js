import Link from "next/link";

const Cards = ({ cards }) => {
  return (
    <div>
      <ul>
        {cards &&
          cards.data.map((card) => {
            return (
              <>
                <li key={card.id}>
                  <Link href={`card/` + card.attributes.slug}>
                    {/* <h1> {card.attributes.Name} </h1> */}
                    <img
                      alt={card.attributes.Name}
                      src={`${card.attributes.Image.data.attributes.url}`}
                    />
                  </Link>
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default Cards;
