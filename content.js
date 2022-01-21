for (const a of document.getElementsByTagName('a')) {

	// Verifica a URL para pegar o ID do mon
	if (a.getAttribute("href").split("/")[1].includes("binemon")) {
		var linhaID = a.textContent;
		var id = a.getAttribute("href").split("/")[2];
		
		const getJSON = async url => {
			const response = await fetch(url);
			
			if(!response.ok) 
				throw new Error(response.statusText);
				
			const data = response.json(); 
			return data;
		};

		// Lê o JSON do mon para verificar as skills
		getJSON("https://api.binemon.io/api/binemons/token/"+id).then(data => {	
			var sk_1_str = JSON.stringify(data.response.binemon_item.skills[0]).replace(/[_'"\[\]\\\/]/gi, "");
			var sk_2_str = JSON.stringify(data.response.binemon_item.skills[1]).replace(/[_'"\[\]\\\/]/gi, "");
			
			// Modifica as imagens de cada skill de cada mon baseado no ID
			var sk = 'https://app.binemon.io/images/skills/habilidade.png';
			var s1 = sk.replace("habilidade", sk_1_str);
			var s2 = sk.replace("habilidade", sk_2_str);			
			
			//  Configura as imagens que aparcerão no site
			html = '<div style="padding: 0 15px"><img src="'+s1+'" width="40px"> <img src="'+s2+'" width="40px"><div>';
			
			// Insere o html na página
			a.insertAdjacentHTML('afterend', html);
						
		}).catch(error => {
		  console.error(error);
		});
	};
	
};