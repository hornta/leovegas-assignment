import React from "react";
import "./movie-genres.css";
import ColorHash from "color-hash";
import { getForegroundColor } from "./utils.js";

export interface MovieGenresProps {
	genres: string[];
}

const colorHash = new ColorHash({ saturation: 0.7 });

export const MovieGenres = ({ genres }: MovieGenresProps) => (
	<ul className="movie-genres">
		{genres.map((genre) => {
			const bgColor = colorHash.hex(genre);
			return (
				<li
					key={genre}
					style={{
						backgroundColor: bgColor,
						color: getForegroundColor(bgColor),
					}}
				>
					{genre}
				</li>
			);
		})}
	</ul>
);
