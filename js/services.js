angular.module('allotServices', ['ng'], function($provide) {
  $provide.factory('Allot', ['$http', '$q', function($http, $q) {
	var self = this;
	var filter = {enable: false, dateFrom:null, dateTo:null, idHotel:null, idRoom:null, type:null};
	var allot = {
		getFilter: function() {
		  return filter;
		},
		setFilter: function(f) {
		  filter = f;
		},
		query: function(cache) {
			if (typeof cache === 'undefined') {
				cache = true;
			}
			console.log('filter', filter);
			var d = $q.defer();
			  if (filter.enable) {
			  console.log('**returning local values');
			  
			}
			//Local testing
			//d.resolve(
			//	[{id:1, hotelName:"Shandrani", roomName: "Ocean View", dateFrom:"01/02/2013", dateTo: "31/02/2013"}, 
			//	{id:3, hotelName:"NoCanDo", roomName: "Foobar View", dateFrom:"01/02/2013", dateTo: "31/02/2013"}, 
			//	{id:2, hotelName:"Le Paradis", roomName: "Junior x Single Room", dateFrom:"01/02/2013", dateTo: "31/02/2013"},
			//	{id:2, hotelName:"L'enfer", roomName: "Junior x Single Room", dateFrom:"01/02/2013", dateTo: "31/02/2013"}]
			//);
			//return d.promise;
			$http.get('/DMS/components/hotel_allot.cfc?method=getAllocs', {cache:cache}).success(function(data) {
				d.resolve(data);
			});
			return d.promise;
		},
		save: function(allot) {
			var d = $q.defer();
			d.resolve(true);
			return d.promise;
			$http({
				method:'POST',
				url: '/DMS/components/hotel_allot.cfc',
				params: {
					method:"setAllot",
					argumentCollection:{allot: allot}, 
					returnFormat:"json"
				}
			})
			.success(function(data) {
				//$(Document).trigger('change');
				d.resolve(data);
			});
			return d.promise;
		},
		get: function(id) {
			
		}
	};
	return allot;
  }]);
  
  $provide.factory('Hotel', ['$http', '$q', function($http, $q) {
	return {
		query: function(cache) {
			if (typeof cache === 'undefined') {
				cache = true;
			}
			var d = $q.defer();
			// Local testing
			//d.resolve(
			//	[{"name":"AMBRE HOTEL","id":2},{"name":"AUBERGE ANSE AUX ANGLAIS","id":3},{"name":"AUBERGE PETIT CERF","id":7},{"name":"AUBERGE MIKO GBAIE","id":10},{"name":"BERJAYA LE MORNE","id":13},{"name":"BOUGAINVILLAS","id":14},{"name":"BLUE LAGOON","id":15},{"name":"BELLE MARE PLAGE","id":16},{"name":"BEACH VILLAS CHOISY","id":18},{"name":"BELLA VISTA HOTEL","id":20},{"name":"COTTON BAY HOTEL","id":21},{"name":"COCONUT","id":22},{"name":"COIN DE MIRE","id":23},{"name":"CHOISY VILLE","id":25},{"name":"CIEL D'ETE","id":26},{"name":"CLUB MED - PTE AUX CANONNIERS","id":27},{"name":"Le Canonnier Hotel","id":29},{"name":"LA CHAUMIERE","id":31},{"name":"CASUARINA","id":32},{"name":"CHANTE-AUX-VENTS","id":35},{"name":"LES COCOTIERS - ROD","id":38},{"name":"CENTRE DE PECHE RN","id":39},{"name":"CASA FLORIDA PEREY","id":40},{"name":"DOMAINE DU CHASSEU","id":41},{"name":"EMERAUDE HOTEL","id":47},{"name":"LES FILAOS BEACH RESORT","id":50},{"name":"FLAMBLOYANT","id":51},{"name":"GOLD CREST","id":54},{"name":"LUX* GRAND-GAUBE - EX LEGENDS","id":55},{"name":"HIBISCUS","id":59},{"name":"PAUL & VIRGINIE","id":62},{"name":"JACARANDAS","id":63},{"name":"KUXVILLE","id":65},{"name":"LE GRAND BLEU","id":67},{"name":"VILLA LA CORALINE","id":70},{"name":"MERRY COTTAGE","id":74},{"name":"Paradis Hotel & Golf Club","id":77},{"name":"MERVILLE HOTEL","id":78},{"name":"MARITIM HTL","id":80},{"name":"MOUROUK","id":81},{"name":"MARINA RESORT","id":82},{"name":"VILLA MON PLAISIR","id":85},{"name":"PENSION NOTRE DAME","id":86},{"name":"OASIS","id":88},{"name":"ORCHIDEES","id":89},{"name":"OISEAU DU PARADIS","id":90},{"name":"PENSION ARC EN CIE","id":92},{"name":"PARADISE COVE HOTEL & SPA","id":93},{"name":"CORALIA MT CHOISY","id":95},{"name":"LE MAURICIA","id":96},{"name":"PIROGUE HOTEL","id":98},{"name":"RHAPSODIE","id":100},{"name":"RELAIS PTE VENIS","id":101},{"name":"ROYAL PALM","id":103},{"name":"SILVER BEACH","id":106},{"name":"SHANGAI","id":108},{"name":"SOFITEL IMPERIAL","id":110},{"name":"SEAPOINT","id":111},{"name":"LE SURCOUF V. HTL","id":113},{"name":"POINTE AUX BICHES","id":116},{"name":"VENTURA HOTEL","id":119},{"name":"LE VICTORIA","id":120},{"name":"VALMARIN T D'EAU D","id":121},{"name":"VERANDA","id":124},{"name":"VALTUR","id":126},{"name":"VILLAS MON CHOISY","id":127},{"name":"LE PRESKIL","id":128},{"name":"LES COCOTIERS","id":129},{"name":"VILLA CATHERINE","id":131},{"name":"TROU AUX BICHES HOTEL","id":133},{"name":"COLONIAL BEACH","id":136},{"name":"Le Touessrok","id":138},{"name":"TROPICAL HTL","id":139},{"name":"ASSONVILLA","id":157},{"name":"VILLA  AQUABELLE","id":158},{"name":"LE SAINT GEORGES","id":161},{"name":"SEAVIEW","id":164},{"name":"ARCHIPEL BUNGALOW","id":167},{"name":"VILLAS LE GUERLAND","id":169},{"name":"PENS FAM AQUARELLE","id":170},{"name":"SUGAR BEACH","id":171},{"name":"VILLA SUN N DORY","id":173},{"name":"ISLAND SPORT CLUB","id":174},{"name":"MALVILLA","id":177},{"name":"BLUE BEACH HOTEL","id":178},{"name":"LE LABOURDONNAIS","id":179},{"name":"SIRENE","id":183},{"name":"VICTOR APPARTMENT","id":185},{"name":"MME DE GRIVEL BUNG","id":188},{"name":"MANISA HOTEL","id":195},{"name":"TAMARIN HTL","id":197},{"name":"VILLAS P. A.ROCHES","id":207},{"name":"BEAU SOLEIL","id":209},{"name":"OCEAN BEACH HOTEL & SPA","id":211},{"name":"BLUE BAY HTL","id":215},{"name":"LE BOUGAINVILLE","id":219},{"name":"MARAHANI REUNION","id":220},{"name":"BARNS COMPLEX","id":222},{"name":"LE PICARDIE HOTEL","id":223},{"name":"LATANIERS BLEU","id":225},{"name":"MOUNT VIEW HOTEL","id":227},{"name":"LES FLAMANTS","id":228},{"name":"CRYSTAL BEACH","id":230},{"name":"VILLA ANABELLA","id":233},{"name":"GRAND BLEU HOTEL","id":235},{"name":"HENRY VINEY","id":246},{"name":"The Residence Mauritius","id":250},{"name":"SUZETTE BUNGALOW","id":251},{"name":"VILLA R.DUVERGE","id":252},{"name":"TAMARIS","id":261},{"name":"ST  ALEXIS HOTEL","id":280},{"name":"VILLA CA'DORO'","id":284},{"name":"LE PRINCE MAURICE","id":287},{"name":"NOIX DE COCO","id":310},{"name":"LA PLANTATION","id":312},{"name":"PALMAR","id":316},{"name":"LE PHARE","id":318},{"name":"LATANNIER APRT - MORNE","id":319},{"name":"BADAMIERS","id":328},{"name":"EBONY WORLD ROD","id":337},{"name":"ECOTOURISME RRG","id":338},{"name":"FILAOS AUB RDG","id":340},{"name":"PALMIER - JETSET","id":351},{"name":"LUX* BELLE MARE - EX BEAU RIVAGE","id":366},{"name":"PRIVATE BUNGALOW","id":381},{"name":"CAMPEMENT PERDREA","id":382},{"name":"RADISSON PLAZA","id":391},{"name":"VILLA PRIVEE","id":401},{"name":"RES LES CYGNES","id":411},{"name":"VILLA AUX AIGRETTS","id":415},{"name":"PETITE BALEINE","id":420},{"name":"SABINA VILLAGE","id":426},{"name":"ANDILANA BEACH MAD","id":428},{"name":"LUX * LE MORNE - EX PAVILLONS","id":429},{"name":"Shandrani Resort & Spa","id":430},{"name":"BANIANS","id":438},{"name":"LUX* ILE DE LA REUNION - EX GRAND HOTEL","id":439},{"name":"The Oberoi","id":446},{"name":"One & Only Le Saint Geran","id":450},{"name":"PEARL BEACH HOTEL","id":452},{"name":"COTE D' AZUR","id":453},{"name":"HILTON HOTEL","id":455},{"name":"Dinarobin Hotel Golf & Spa","id":460},{"name":"BEACH CLUB","id":468},{"name":"AUBERGEDEQ.BORNES","id":469},{"name":"SPICE GARDEN","id":481},{"name":"VILLA SUPER INA","id":490},{"name":"ESCALE VACANCES","id":520},{"name":"TERRES OCEANES","id":538},{"name":"Villa The Pavillon","id":540},{"name":"THE SANDS","id":569},{"name":"LE SAKOA","id":582},{"name":"DATTIERS - JETSET","id":615},{"name":"CALODYNE SUR MER","id":631},{"name":"VILLA MAURITOURS","id":632},{"name":"INDIAN RESORT & SPA","id":636},{"name":"VILLA JORICO","id":640},{"name":"COCOTERAIE","id":647},{"name":"VILLA AFRESCO","id":652},{"name":"BOIS D OISEAUX","id":657},{"name":"TARISA RESORT","id":676},{"name":"TAMIER - JETSET","id":683},{"name":"VILLA FOUR A CHAUX","id":709},{"name":"VILLA PALMTREE","id":710},{"name":"VILLA EXOTICA","id":711},{"name":"VILLA ANTHURIUM","id":714},{"name":"VILLA ROSA","id":715},{"name":"VILLA ALIX","id":716},{"name":"VILLA MIMI","id":717},{"name":"VILLA NEO\/ARUM","id":718},{"name":"VILLA JACQUELINE","id":719},{"name":"VACANCES SOLEIL","id":720},{"name":"LE MERIDIEN","id":723},{"name":"VILLA BAGHEERA","id":729},{"name":"LA CRISTALLINE","id":736},{"name":"VILLA FRANGIPANE","id":742},{"name":"EL MONACO","id":746},{"name":"SAINT GEORGES","id":747},{"name":"KLONDIKE","id":748},{"name":"VILLA CAROLINE","id":749},{"name":"COLONIAL COCONUT HOTEL","id":750},{"name":"JETS VILLAS","id":751},{"name":"AIRPORT","id":752},{"name":"Clinique Darne","id":754},{"name":"ELYSIUM","id":755},{"name":"SUNSET BOULEVARD","id":756},{"name":"CLINIQUE DU NORD","id":758},{"name":"PORT LOUIS","id":762},{"name":"RESIDENCE PERAMAL","id":763},{"name":"--PLS SELECT--","id":764},{"name":"HARBOUR","id":766},{"name":"LE SUFFREN HOTEL & MARINA","id":767},{"name":"COCO BEACH","id":771},{"name":"HERITAGE AWALI GOLF & SPA RESORT","id":773},{"name":"POINTE VENUS","id":774},{"name":"LE PALMISTE","id":775},{"name":"GRAND-BAY","id":776},{"name":"VOILE D'OR","id":777},{"name":"Heritage le Telfair Golf & Spa Resort","id":778},{"name":"MARADIVA VILLAS RESORT AND SPA","id":4501},{"name":"RIVIERE NOIRE","id":4503},{"name":"CONNECTION REUNION ISLAND","id":4506},{"name":"QUATRE BORNES","id":4510},{"name":"QUATRE EPICES","id":4513},{"name":"GRAND BAY TRAVEL","id":4519},{"name":"DeBarcadere Trou-D'eau Douce","id":4520},{"name":"CLINIQUE DE LORETTE","id":4533},{"name":"GOLD BEACH RESORT","id":4537},{"name":"TAMARIS-MRU","id":4540},{"name":"NO HOTEL","id":4541},{"name":"LA PALMERAIE","id":4542},{"name":"LAKSHA VILLA","id":4544},{"name":"PEREYBERE","id":4545},{"name":"ROSE-HILL","id":4547},{"name":"LA COLOMBIERE KITE SURF & RESIDENCE","id":4548},{"name":"CHEZ VACO","id":4549},{"name":"TI FLEUR SOLEIL","id":4550},{"name":"LATANNIER APRT - JETSET","id":4551},{"name":"BLUE SHELL - JETSET","id":4552},{"name":"GRENADIER - JETSET","id":4553},{"name":"Les Orchidees","id":4554},{"name":"DODO TRAVEL & TOURS","id":4556},{"name":"BAIN BOEUF","id":4557},{"name":"LAKAZ CHAMAREL","id":4558},{"name":"20 DEGRES SUD","id":4560},{"name":"RESIDENCE SILVER PALM","id":4562},{"name":"POINTE VILLAS","id":4563},{"name":"LES CHALETS EN CHAMPAGNE","id":4568},{"name":"GROUP STATS","id":4569},{"name":"CLUB MED - ALBION","id":4570},{"name":"CASA DEL SOL","id":4571},{"name":"CHANTEMER","id":4572},{"name":"MARIPOSA","id":4573},{"name":"GOLD NEST","id":4574},{"name":"CLINIQUE BON PATSEUR","id":4580},{"name":"GRAND BAY MEDICAL & DIGNOSTIC CENTRE","id":4581},{"name":"CITY CLINIC","id":4582},{"name":"RESIDENCE CAPRI","id":4583},{"name":"FELICITA","id":4584},{"name":"PHOENIX","id":4588},{"name":"L'EXIL LODGE","id":4589},{"name":"ANDREA LODGE","id":4590},{"name":"OCEAN BEAUTY","id":4591},{"name":"MOVENPICK RESORT & SPA MAURITIUS","id":4594},{"name":"EUREKA","id":4603},{"name":"PAPILLONS HOTELS AND VILLAS","id":4605},{"name":"JET 7 RENTAL","id":4607},{"name":"Shanti Maurice","id":4612},{"name":"CENTRE MEDICAL DU NORD","id":4614},{"name":"BELLE RIVE HOTEL","id":4615},{"name":"LA VIEILLE CHEMINEE","id":4622},{"name":"OCEAN DRIVE","id":4626},{"name":"FLIC EN FLAC BEACH APARTMENT","id":4627},{"name":"LA MAISON D'ETE","id":4628},{"name":"VILLAS AMARILYS","id":4629},{"name":"TAMASSA","id":4631},{"name":"NOUVELLE FRANCE","id":4632},{"name":"LE DOMAINE","id":4633},{"name":"ANAHITA","id":4635},{"name":"ROYAL SUNSET","id":4636},{"name":"LES SIRANDANES","id":4637},{"name":"IRS TAMARINA","id":4647},{"name":"COCO VILLA","id":4656},{"name":"VILLA BELLE CREOLE","id":4657},{"name":"DOMAINE D ANSE JONCHEE","id":4658},{"name":"VILLA L'HARMONIE","id":4659},{"name":"Bungalow  Eden","id":4660},{"name":"JARDIN DU CAP","id":4661},{"name":"LES COCOTIERS GRAND BAY","id":4662},{"name":"L'HACIENDA","id":4663},{"name":"POLYCLINIQUE","id":4665},{"name":"FOUR SEASONS RESORTS","id":4668},{"name":"GRAND BAY HOLIDAY RESORT","id":4669},{"name":"LES LAURIERS","id":4670},{"name":"VAL VANTHA RESORT","id":4671},{"name":"THE CHISTY SHIFA CLINIC","id":4672},{"name":"ELYSEE HOTEL","id":4673},{"name":"THE GRAND MAURITIAN RESORT & SPA","id":4675},{"name":"TAMARINA Golf & Spa","id":4676},{"name":"LE RECIF","id":4678},{"name":"ASTROEA BEACH HOTEL","id":4680},{"name":"LA BELLE COLONIALE","id":4681},{"name":"RAJ MAHAL","id":4682},{"name":"ACACIA HOLIDAY APARTMENT","id":4684},{"name":"LE MORNEA","id":4685},{"name":"VILLA L'ILOT","id":4686},{"name":"CLINIQUE DE L OCCIDENT","id":4687},{"name":"LES AIGRETTES","id":4688},{"name":"PETRIN JUNCTION GRAND BASSIN","id":4689},{"name":"INTERCONTINENTAL","id":4691},{"name":"VILLA NENUPHAR ","id":4692},{"name":"VILLA L'ILOT MALAIS ","id":4693},{"name":"LAGUNA BEACH HOTEL & SPA","id":4694},{"name":"MONDIAL ASSISTANCE REUNION ","id":4695},{"name":"THE BAY HOTEL ","id":4696},{"name":"LA BELLE CREOLE","id":4697},{"name":"VILLA LA PLUME ","id":4698},{"name":"RESIDENCE SABLE BLEU -CALODYNE","id":4703},{"name":"HENNESSY PARK HOTEL - EX THE LINK HOTEL","id":4704},{"name":"VILLA PAPAYE ","id":4705},{"name":"VILLA SAPHIR ","id":4713},{"name":"MARLIN CREEK","id":4714},{"name":"PORT CHAMBLY","id":4715},{"name":"JALSA BEACH HOTEL & SPA ","id":4716},{"name":"VILLA SANKHARA","id":4721},{"name":"RESIDENCE BAY VIEW ","id":4723},{"name":"EBENE TOWER ","id":4725},{"name":"PETITE RIVIERE","id":4727},{"name":"APOLLO BRAMWELL HOSPITAL ","id":4728},{"name":"DR KOVILA  PARSURAMEN","id":4729},{"name":"POINTE D ESNY ","id":4732},{"name":"VALLEY DE FERNEY","id":4734},{"name":"LE JARDIN BEAU VALLON ","id":4736},{"name":"BEAU CHAMP ","id":4737},{"name":"BROWN SEQUARD HOSPITAL ","id":4738},{"name":"VILLA CAROLE ","id":4740},{"name":"FLIC EN FLAC ","id":4741},{"name":"MASCAREIGNES VILLAS","id":4742},{"name":"HOSPITAL ROSE BELLE ","id":4743},{"name":"REDUIT UNIVERSITY","id":4744},{"name":"JET RESORT ","id":4745},{"name":"OASIS BEACH CLUB ","id":4746},{"name":"LE COTEAU FLEURIE BOUTIQUE BED AND BREAKFAST ","id":4747},{"name":"LA GAULETTE ","id":4748},{"name":"LA ROCCA VILLA","id":4749},{"name":"LE GRAND HOTEL DU LAGON REUNION ","id":4751},{"name":"GRAND BAY SUITES ","id":4752},{"name":"VILLA CERISE","id":4753},{"name":"LE CERISIER ","id":4754},{"name":"HERITAGE VILLAS","id":4755},{"name":"LONG BEACH ","id":4756},{"name":"WARD HOLIDAYS LTD ","id":4757},{"name":"ROCA NERA","id":4758},{"name":"CAPE GARDEN ","id":4760},{"name":"VILLA L ESCALE","id":4762},{"name":"DE CONTI ","id":4764},{"name":"VICTORIA HOSPITAL ","id":4765},{"name":"AANARI HOTEL & SPA ","id":4766},{"name":"LES VALEES D HELVETIA ","id":4767},{"name":"LE CHAMP DE MARS ","id":4770},{"name":"ORCHIDEE","id":4772},{"name":"ALIDOU ","id":4774},{"name":"EVACO HOLIDAY RESORTS ","id":4776},{"name":"LE CARDINAL","id":4777},{"name":"LE RECIF REUNION ","id":4778},{"name":"SO MAURITIUS BEL OMBRE","id":4779},{"name":"ST PATRICK CLINIC ","id":4780},{"name":"GITE BRULE ","id":4782},{"name":"GOLD LEAF ","id":4783},{"name":"CREVE COEUR APPT RODRIGUES ","id":4787},{"name":"CAPE POINT ","id":4789},{"name":"PEREYBERE ","id":4790},{"name":"MERIDIANA  FLY ","id":4791},{"name":"SAM VILLA ","id":4792},{"name":"WHITE OAKS ","id":4793},{"name":"DREAM YACHT CHARTER ","id":4794},{"name":"SKYDIVE AUSTRAL MAURITIUS ","id":4795},{"name":"ANGSANA BALACLAVA","id":4797},{"name":"WEST COAST VIEW APPARTMENT","id":4798},{"name":"LA MAISON BLEUE","id":4799},{"name":"BON AZUR","id":4801},{"name":"BEL AZUR","id":4802},{"name":"PIK PIK APARTMENT","id":4803},{"name":"VILLA RIAMBEL","id":4804},{"name":"TAMARINIER COMPLEX","id":4805},{"name":"LUX* MALDIVES - EX DIVA MALDIVES","id":4807},{"name":"THE ST REGIS MAURITIUS RESORT","id":4810},{"name":"CLINIQUE SAINT JEAN ","id":4812},{"name":"ROCHE BOIS","id":4813},{"name":"PARADISE BEACH ","id":4814},{"name":"LEORA BEACHFRONT APARTMENT","id":4815},{"name":"VOILA BAGATELLE HOTEL ","id":4816},{"name":"MONALYSA BUNGALOW","id":4817},{"name":"DOMAINE ST DENNIS","id":4818},{"name":"AUBERGE DE LA MADELON","id":4819},{"name":"VILLA LA BOISERIE ","id":4820},{"name":"TEKOMA BOUTIK HOTEL","id":4821}]
			//);
			//return d.promise;
			//
			$http.get('/DMS/components/hotel_allot.cfc?method=getHotels', {cache:cache}).success(function(data) {
				d.resolve(data);
			});
			return d.promise;
		}
	};
  }]);
  $provide.factory('Room', ['$http', '$q', function($http, $q) {
	return {
		query: function(idHotel, cache) {
			if (typeof idHotel === 'undefined') {
				return false;
			}
			if (typeof cache === 'undefined') {
				cache = true;
			}
			var d = $q.defer();
			// Local testing
			//d.resolve(
			//	[{"occupancy":"DOUBLE","name":"SUPERIOR ROOMDOUBLEAll Inclusive","id":2629,"meal":"All Inclusive","cat":"SUPERIOR ROOM"},{"occupancy":"SINGLE","name":"SUPERIOR ROOMSINGLEAll Inclusive","id":2630,"meal":"All Inclusive","cat":"SUPERIOR ROOM"},{"occupancy":"DOUBLE","name":"DELUXE ROOMDOUBLEAll Inclusive","id":2631,"meal":"All Inclusive","cat":"DELUXE ROOM"},{"occupancy":"SINGLE","name":"DELUXE ROOMSINGLEAll Inclusive","id":2632,"meal":"All Inclusive","cat":"DELUXE ROOM"},{"occupancy":"2 ADTS & 3 CHDS","name":"FAMILY APARTMENT2 ADTS & 3 CHDSAll Inclusive","id":2633,"meal":"All Inclusive","cat":"FAMILY APARTMENT"},{"occupancy":"DOUBLE","name":"SENIOR SUITEDOUBLEAll Inclusive","id":2634,"meal":"All Inclusive","cat":"SENIOR SUITE"},{"occupancy":"SINGLE","name":"SENIOR SUITESINGLEAll Inclusive","id":2635,"meal":"All Inclusive","cat":"SENIOR SUITE"},{"occupancy":"2 ADTS & 3 CHDS","name":"FAMILY SUITE2 ADTS & 3 CHDSAll Inclusive","id":2636,"meal":"All Inclusive","cat":"FAMILY SUITE"},{"occupancy":"PER PERSON","name":"DAY USEPER PERSONAll Inclusive","id":2986,"meal":"All Inclusive","cat":"DAY USE"},{"occupancy":"DOUBLE","name":"SUPERIOR ROOM BEACHDOUBLEAll Inclusive","id":3313,"meal":"All Inclusive","cat":"SUPERIOR ROOM BEACH"},{"occupancy":"SINGLE","name":"SUPERIOR ROOM BEACHSINGLEAll Inclusive","id":3314,"meal":"All Inclusive","cat":"SUPERIOR ROOM BEACH"},{"occupancy":"DOUBLE","name":"LATE CHECK OUT UNTIL 18HRSDOUBLEAll Inclusive","id":3750,"meal":"All Inclusive","cat":"LATE CHECK OUT UNTIL 18HRS"},{"occupancy":"DOUBLE","name":"LATE CHECK OUTDOUBLEAll Inclusive","id":3784,"meal":"All Inclusive","cat":"LATE CHECK OUT"},{"occupancy":"SINGLE","name":"LATE CHECK OUTSINGLEAll Inclusive","id":3785,"meal":"All Inclusive","cat":"LATE CHECK OUT"},{"occupancy":"PER ROOM","name":"ROOM CANCELLATIONPER ROOMNone","id":3786,"meal":"None","cat":"ROOM CANCELLATION"},{"occupancy":"VISIT","name":"INSPECTIONVISITNone","id":3857,"meal":"None","cat":"INSPECTION"}]
			//);
			//return d.promise;
			//
			$http.get('/DMS/components/hotel_allot.cfc?method=getRooms&idHotel='+idHotel, {cache:cache}).success(function(data) {
				d.resolve(data);
			});
			return d.promise;
		}
	};
  }]);
  
});