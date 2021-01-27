var lib = Nanogram;

function buildPorfolio() {
	var preloader = document.getElementById("preloader");
	preloader.classList.add("preloader--loading");
	return lib
		.getMediaByUsername("len.beauty.sg")
		.then(function (response) {
			console.log(response.profile);

			// Get photos
			var photos = response.profile.edge_owner_to_timeline_media.edges;
            var items = [];
            
			for (var i = 0; i <= photos.length - 1; i++) {
				var current = photos[i].node;

				var div = document.createElement("div");
				var link = document.createElement("a");
				var img = document.createElement("img");

				var thumbnail = current.thumbnail_resources[4];
				var imgSrc = thumbnail.src;
				var imgWidth = thumbnail.config_width;
				var imgHeight = thumbnail.config_height;
				var imgAlt = current.accessibility_caption;

				var shortcode = current.shortcode;
				var linkHref = "https://www.instagram.com/p/" + shortcode;

				div.classList.add("portfolio__item");

				img.classList.add("portfolio__img");
				img.src = imgSrc;
				img.width = imgWidth;
				img.height = imgHeight;
				img.alt = imgAlt;

				link.classList.add("portfolio__link");
				link.href = linkHref;
				link.target = "_blank";

				link.appendChild(img);
				div.appendChild(link);

				items.push(div);
			}

			// Create container for our portfolio
			var container = document.createElement("div");
			container.id = "portfolio";
			container.classList.add("portfolio");

			// Append all photos to our container
			for (var j = 0; j <= items.length - 1; j++) {
				container.appendChild(items[j]);
			}

			// Append our container to body
			document.body.appendChild(container);

			preloader.classList.remove("preloader--loading");
		})
		.catch(function (error) {
			console.log(error);
			preloader.classList.remove("preloader--loading");
		});
}

buildPorfolio();