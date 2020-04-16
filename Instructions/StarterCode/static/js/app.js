// import data using D3
d3.json("samples.json").then(data => {
    // console.log(data);

    // create list for names
    var names = data.names;

    // set empty list for metadata and samples data
    var metadatalist = [];
    var samplelist = [];

    // add subject id's to empty lists
    var metadata = data.metadata;
    metadata.forEach(row => metadatalist.push(row));

    var samples = data.samples;
    samples.forEach(row => samplelist.push(row));

    // set drop down menu
    for (x = 0; x < data.names.length; x++) {
        var dropdown = d3.select("#selDataset");
        dropdown.append("option").text(data.names[x]).attr("value", data.names[x]);

    };

    // load pagw tih subject id 940
    bar(samples, 940)
    demograpics(metadata, 940)
    bubbleChart(samples, 940)
   

});

function demograpics(metadata, id) {
    var dropdown = d3.select("#selDataset").property("value");
    // console.log(dropdown);

    // filter metadata by id and convert id id sting to int
    var demograpicSelect = metadata.filter(d => +d.id === +dropdown);
    // console.log(demograpicSelect)

    // select div for sample-metadata and clear previous appended info
    var sampleMetadata = d3.select("#sample-metadata").html("");

    // loop through metadata objects and log each key/value pairs with object.entries function
    demograpicSelect.forEach((getInfo) => {
        Object.entries(getInfo).forEach(([key, value]) => {
            sampleMetadata.append("h5").text(`${key}: ${value}`);
        });
    });
};

function bar(metadata, id) {

    var dropdown = d3.select("#selDataset").property("value");
    // console.log(dropdown);

    // filter samples by id and convert id id sting to int
    var sampleSelect = metadata.filter(d => +d.id === +dropdown);
    //  console.log(sampleSelect)


    // put the values for selected id in drop down selection into lists
    var sampleValues = sampleSelect[0].sample_values;
    var otuIds = sampleSelect[0].otu_ids;
    var otuLabels = sampleSelect[0].otu_labels;

    // slice samples to top 10
    var sliceSampVal = sampleValues.slice(0, 10);

    // set data to desecending
    var reversedVal = sliceSampVal.reverse();
    var slicedOtu = otuIds.slice(0, 10);


    // convert number list to a string to show on y axis
    var stringOtu = slicedOtu.map(num => `OTU ${num}`);

    // set data to desecending
    var reverseOtu = stringOtu.reverse();
    var sliceLabels = otuLabels.slice(0, 10);

    // define bar chart trace

    var bar_trace = {
        x: reversedVal,
        y: reverseOtu,
        text: sliceLabels,
        name: `id: ${id}`,
        type: "bar",
        orientation: "h"
    };

    // set trace to data variable to be used for plotting
    var bar_data = [bar_trace];

    // set bar chart layout
    var layout = {
        title: `id: ${id} Top Ten OTUs`,
        xaxis: {
            title: {
                text: "Sample Values"
            }
        }
    };

    // plot bar using plot.ly
    Plotly.newPlot("bar", bar_data, layout);
}

// function to plot bubble chart
function bubbleChart(samples, id) {

    var dropdown = d3.select("#selDataset").property("value");
    // console.log(dropDownSelect);

    // filter samples by id and convert id sting to int
    var sampleSelect = samples.filter(d => +d.id === +dropdown);

    var otuIds = sampleSelect[0].otu_ids;
    var sampleValues = sampleSelect[0].sample_values;
    var otuLabels = sampleSelect[0].otu_labels;

    // define bubble chart trace
    var bubble_trace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        name: `id: ${id}`,
        mode: 'markers',
        marker: {
            color: otuIds,
            size: sampleValues,
        }
    };
    // set trace to data variable in a list to be used for plotting
    var bubble_data = [bubble_trace];

    // set bubble chard layout
    var bubble_layout = {
        title: `id: ${id} Sample Data`,
        yaxis: {
            title: {
                text: "Sample Values"
            }
        },
        xaxis: {
            title: {
                text: "OTU ID"
            }
        },
    };

    // plot bubble chart
    Plotly.newPlot("bubble", bubble_data, bubble_layout);
}

        
function optionChanged(id) {
    // console.log(id),
    d3.json("samples.json").then(data => {
        // console.log(data);

        // create list for names
        var names = data.names;

        // set empty list for metadata and samples data
        var metadatalist = [];
        var samplelist = [];

        // add subject id's to empty lists
        var metadata = data.metadata;
        metadata.forEach(row => metadatalist.push(row));

        var samples = data.samples;
        samples.forEach(row => samplelist.push(row));

        // refresh page with id selection
        bar(samplelist, id),
            demograpics(metadatalist, id);
        bubbleChart(samplelist, id);
        // gauge(metadatalist, 940)
    });
}



































