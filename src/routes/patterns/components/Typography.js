import React from "react";

import { Card } from "styled";

const Typography = () => (
  <Card className="Typography">
    <ul>
      <li>
        <h4 className="legend">h1</h4><h1>Headline 1</h1>
      </li>
      <li>
        <h4 className="legend">h2</h4><h2>Headline 2</h2>
      </li>
      <li>
        <h4 className="legend">h3</h4><h3>Headline 3</h3>
      </li>
      <li>
        <h4 className="legend">h4</h4><h4>Headline 4</h4>
      </li>
      <li>
        <h4 className="legend">h4</h4><h5>Headline 5</h5>
      </li>
      <li>
        <h4 className="legend">p.large</h4>
        <p className="large">
          Vim omnis epicurei ne, pro partem definiebas ad.
        </p>
      </li>
      <li>
        <h4 className="legend">p</h4>
        <p>
          Nec doctus nostrum te, cum mundi possim explicari an. Ea usu legere soluta, eligendi posidonium ad sit.
        </p>
      </li>
    </ul>
  </Card>
);

export default Typography;
