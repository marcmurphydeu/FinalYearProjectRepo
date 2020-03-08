import Grid from '@material-ui/core/Grid';
import React from 'react';
import AnalysisController from '../Controllers/AnalysisController';

export default function Analysis(){
    return (
        <Grid id="analysisComponent" item xs ={12}>
            <Grid xs={11} id ="AnalysisTitle">
                <h1 className="analysisTitleText">Analysis</h1>
            </Grid>
            <Grid item xs = {11}>
                <h2 className="analysisTitleText">What are the countries most affected if sea levels rise 5 meters? (2018)</h2>
                <div id="analysis1">{AnalysisController('analysis1')}</div>
                <span className="analysisDescription">This map displays the countries with the highest area within 5 meters of sea level.
                            With this data, if the sea does indeed rise to such extremes, the label of the markers displays the countries'
                            population as a approximation of the population that could suffer from the consequences.

                    </span>
            </Grid>
            <Grid item xs = {11} id = "energyComparison">
                <h2 className="analysisTitleText">Comparing CO2 emissions with renewable energy consumption in 2014</h2>
                
                <Grid item xs = {5}>
                    <div className="analysis" id="analysis2">{AnalysisController('analysis2')}</div>
                    <span className="analysisDescription">This visualization represents the 10 most CO2 emitting countries with their 
                          respected renewable energy consumption. One can observe how China has the highest CO2 emission and doesn't have 
                          high renewable energy values. In comparison, countries such as Canada have a relative high renewable energy value
                          regardless of being in the top countries emitting CO2.
                    </span>
                </Grid>
                <Grid item xs = {5}>
                    <div className="analysis" id="analysis3">{AnalysisController('analysis3')}</div>
                    <span className="analysisDescription">In contrast to the visualization on the left, this one represents the top 10 most
                            countries with the most renewable energy consumption with their respected CO2 emissions. As observed, these countries
                            don't have the tendency to also have high CO2 emissions. These are also underdeveloped countries
                    </span>
                </Grid>            
            </Grid>
            <Grid item xs = {11}>
                    <h2 className="analysisTitleText">Do the countries with most agricultural land also have high arable land? (2016)</h2>

                    <div className="analysis" id="analysis4">{AnalysisController('analysis4')}</div>
                    <span className="analysisDescription">As seen, not all countries have a corresponding high arable land value. This may be
                            due to many factors. Examples visible are Saudi Arabia or South Africa which have very high agricultural land but low
                            arable land. However, countries such as the United Kingdom have both of these properties with high values.
                    </span>
            </Grid> 
            <Grid item xs = {11} id = "protectedAreas">
                <Grid item xs = {12}>
                    <h2 className="analysisTitleText">Comparing protected areas in 2016 </h2>
                </Grid>
                
                <Grid item xs = {4}>
                    <div className="analysis" id="analysis5">{AnalysisController('analysis5')}</div>
                    <span className="analysisDescription">This visualization displays the highest values in Forest Area compared to the same country 
                            having Terrestrial protected area (% of total land area). This illustrates that the countries with highest forest area don't necessarily have
                            high terrestrial protected areas (although for Bhutan and Brunei this is the case).
                    </span>
                </Grid>
                <Grid item xs = {4}>
                    <div className="analysis" id="analysis6">{AnalysisController('analysis6')}</div>
                    <span className="analysisDescription">Similarly to the example on the left, this returns the countries with highest Terrestrial protected areas in comparison
                            to their Forest Area. This is the exact opposite as the counterpart on the left. However, there seems to be a correlation in high Terrestrial protected areas 
                            having high forest area (although Greenland obviously doesn't have much Forest area).
                    </span>
                </Grid>   
                <Grid item xs = {4}>
                    <div className="analysis" id="analysis7">{AnalysisController('analysis7')}</div>
                    <span className="analysisDescription">This shows the results from the 10 highest Terrestrial Protected Areas and, independently, the 10 highest
                            Marine Protected Areas. The intersection of these two queries shows how Slovenia is in the highest values for both properties and so is New Caledonia.
                            Of course, if the limit of visual content is increased, more pairs will be visible.
                    </span>
                </Grid>         
            </Grid> 
        </Grid>
    )
}