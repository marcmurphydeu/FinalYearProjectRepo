import Grid from '@material-ui/core/Grid';
import React from 'react';
import AnalysisController from '../Controllers/AnalysisController';

export default function Analysis(){
    return (
        <Grid id="analysisComponent" item xs ={12}>
            <Grid xs={11} id ="AnalysisTitle">
                <h1 className="analysisTitleText">Analysis</h1>
            </Grid>
            <Grid item xs = {11} id = "elevationComparison">
                <h2 className="analysisTitleText">What are the countries that would have been most affected if sea levels rose 5 meters in 2010?</h2>

                <Grid item xs = {11}>
                    <div className="analysis" id="analysis1">{AnalysisController('analysis1')}</div>
                    <div className="analysisDescription">This map displays the countries with the highest area within 5 meters of sea level.
                            With this data, if the sea had indeed risen to such extremes, the label on the markers displays the population that would be affected.
                            This data is computed by getting the countries with the maximum area within 5 meters, the population of these countries and
                            the percentage of the population living within 5 meters of sea level. Population affected = total country population * (Percentage affected/100)
                    </div>
                </Grid>            
            </Grid>
            <Grid item xs = {11} id = "energyComparison">
                <Grid item xs={11}>
                    <h2 className="analysisTitleText">Comparing CO2 emissions with renewable energy consumption in 2014</h2>
                </Grid>
                
                <Grid item xs = {5}>
                    <div className="analysis" id="analysis2">{AnalysisController('analysis2')}</div>
                    <div className="analysisDescription">This visualization represents the 10 most CO2 emitting countries with their 
                          respected renewable energy consumption. One can observe how China has the highest CO2 emission and doesn't have 
                          high renewable energy values. In comparison, countries such as Canada have a relative high renewable energy value
                          regardless of being in the top countries emitting CO2.
                    </div>
                </Grid>
                <Grid item xs = {5}>
                    <div className="analysis" id="analysis3">{AnalysisController('analysis3')}</div>
                    <div className="analysisDescription">In contrast to the visualization on the left, this one represents the top 10 most
                            countries with the most renewable energy consumption with their respected CO2 emissions. As observed, these countries
                            don't have the tendency to also have high CO2 emissions. These are also underdeveloped countries
                    </div>
                </Grid>            
            </Grid>
            <Grid item id ="agriculturalLand" xs = {11}>
                <Grid item xs ={11} >
                    <h2 className="analysisTitleText">Do the countries with most agricultural land also have high arable land? (2016)</h2>
                </Grid>
                <Grid item xs = {11}>
                    <div className="analysis" id="analysis4">{AnalysisController('analysis4')}</div>
                    <div className="analysisDescription">As seen, not all countries have a corresponding high arable land value. This may be
                            due to many factors. Examples visible are Saudi Arabia or South Africa which have very high agricultural land but low
                            arable land. However, countries such as the United Kingdom have both of these properties with high values.
                    </div>
                </Grid>
            </Grid> 
            <Grid item xs = {11} id = "protectedAreas">
                <Grid item xs = {11}>
                    <h2 className="analysisTitleText">Comparing protected areas in 2016 </h2>
                </Grid>
                
                <Grid item xs = {3}>
                    <div className="analysis" id="analysis5">{AnalysisController('analysis5')}</div>
                    <div className="analysisDescription">This visualization displays the highest values in Forest Area compared to the same country 
                            having Terrestrial protected area (% of total land area). This illustrates that the countries with highest forest area don't necessarily have
                            high terrestrial protected areas (although for Bhutan and Brunei this is the case).
                    </div>
                </Grid>
                <Grid item xs = {3}>
                    <div className="analysis" id="analysis6">{AnalysisController('analysis6')}</div>
                    <div className="analysisDescription">Similarly to the example on the left, this returns the countries with highest Terrestrial protected areas in comparison
                            to their Forest Area. This is the exact opposite as the counterpart on the left. However, there seems to be a correlation in high Terrestrial protected areas 
                            having high forest area (although Greenland obviously doesn't have much Forest area).
                    </div>
                </Grid>   
                <Grid item xs = {3}>
                    <div className="analysis" id="analysis7">{AnalysisController('analysis7')}</div>
                    <div className="analysisDescription">This shows the results from the 10 highest Terrestrial Protected Areas and, independently, the 10 highest
                            Marine Protected Areas. The intersection of these two queries shows how Slovenia is in the highest values for both properties and so is New Caledonia.
                            Of course, if the limit of visual content is increased, more pairs will be visible.
                    </div>
                </Grid>         
            </Grid> 
        
            <Grid item xs = {11} id = "energyProduction">
                <Grid item xs = {11}>
                    <h2 className="analysisTitleText">Comparing percentage of energy production types used in Low, Middle and High income countries in 1978 and 2015</h2>
                </Grid>
                
                <Grid item xs = {3}>
                    <div className="analysis" id="analysis8">{AnalysisController('analysis8')}</div>
                    <div className="analysisDescription"><strong>Low Income: </strong> In both years, these countries produced Hydroelectric energy as their most abundant source.
                            As one might expect, coal energy was higher in 1978 with 15% compared to a 2% in 2015. Another visible aspect is that back then, energy from natural and renewable
                            sources was not even close to adding up to 0.5% of the total energy production. Whereas for natural sources, in 2015 the value is of 13%. A big difference is that there are no
                            values for Nuclear Energy, probably meaning that the values are so low they are not considered.
                    </div>
                </Grid>
                <Grid item xs = {3}>
                    <div className="analysis" id="analysis9">{AnalysisController('analysis9')}</div>
                    <div className="analysisDescription"><strong>Middle income: </strong> In contrast to Low income, the highest value in 1978 is Hydroelectric but with Coal energy closely next, being the highest value in 2015.
                            Interestingly, Nuclear energy was higher in the past than recently for Middle Income countries. 
                    </div>
                </Grid>   
                <Grid item xs = {3}>
                    <div className="analysis" id="analysis10">{AnalysisController('analysis10')}</div>
                    <div className="analysisDescription"><strong>High income: </strong> There's a visible increase in the thickness in the relationships from Low to Middle income indicating a higher use of energy. However, this increase is 
                            is more evident in Higher Income countries. There's a notable decrease in the use of oil energy from 1978 to 2015 with a difference of 22% compared to 3%. In this case, coal production was already dominant in the past 
                            compared to Low and Middle income countries. However the distribution in use of energy is more even in 2015 where in Low and Middle income especially Hydroelectric production amounts to almost half the of total percentage.
                            Moreover, the growth in production of renewable energy is twice as much as it's growth in Low and Middle income countries.
                    </div>
                </Grid>         
            </Grid>
        </Grid>
    )
}