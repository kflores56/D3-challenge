# Data Journalism & D3

## Background

Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/), but you are free to investigate a different data set. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

### Initial Chart

* A scatter plot was created between two of the data variables: `Healthcare vs. Poverty`.

* Using the D3 techniques, a scatter plot was created that represents each state with circle elements. The graphic was coded in the `app.js` file of the directory—the data pulled from `data.csv` by using the `d3.csv` function. 

* State abbreviations are included in the circles.

* Axes and labels were created and situated to the left and bottom of the chart.

<img src="https://github.com/kflores56/D3-challenge/blob/main/assets/images/poverty.png" />

### Secondary Chart

* The additional demographic, `Age`, was included along the x axis.  

* Additional labels were placed in your scatter plot and given click events so that users can decide which data to display. Transitions were animated for your circles' locations as well as the range of your axes.

<img src="https://github.com/kflores56/D3-challenge/blob/main/assets/images/age.png" />
