
export default (data, fieldToOrderBy, direction) => {
    // 1. Stockage dans un tableau des valeurs de propriété à classer ('city' ou 'country' ou 'state') accompagnées 
    // de l'objet correspondant contenu dans la data 'dataVilles'
    var dataToSort = [];
    data.forEach(city => {
        dataToSort.push({ 
            fieldOrderedBy: city[fieldToOrderBy], 
            dataCity: city 
        });
    });

    // 2. Classement du tableau
    var int = (direction === 'asc') ? 1 : -1;
    dataToSort.sort( (a, b) => { return (a.fieldOrderedBy > b.fieldOrderedBy) ? int : ((b.fieldOrderedBy > a.fieldOrderedBy) ? (int * -1) : 0); }); /// Classement du premier au dernier


    // 3. Si autre colonne à classer que celle des villes, alors nouveau classement...
    if(fieldToOrderBy !== 'city') {
        var propertyToOrderby = "";
        // 3.1. Stockage ds un tableau des données à classer
        var dataToSort_TEMPO = [];
        for(var i=0; i < dataToSort.length; i++) {
            var obj = dataToSort[i];
            propertyToOrderby = obj.dataCity[fieldToOrderBy];
            propertyToOrderby = propertyToOrderby === null ? "-" : propertyToOrderby;
            dataToSort_TEMPO.push({ fieldOrderedBy: propertyToOrderby, dataCity: obj.dataCity });
        }
        dataToSort = dataToSort_TEMPO;

        // 3.2. Classement du tableau
        dataToSort.sort(function (a, b) { return (a.fieldOrderedBy > b.fieldOrderedBy) ? int : ((b.fieldOrderedBy > a.fieldOrderedBy) ? (int * -1) : 0); }); /// Classement du premier au dernier
    }


    return dataToSort.map(d => d.dataCity);
}