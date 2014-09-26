/*DC_Offset: R.P. da Costa 2014Version: 0.0.1DC_Offset zoekt een comp met de naam "RenderComp" en bekijkt de layers die erin zitten.Vervolgens gebruikt dit script een (NULL) object layer genaamd Master_CTRL.Master_CTRL bevat twee Effect Control Sliders.* MasterStartFrame (1)* MasterEndFrame (2)De getallen die hierin worden ingevoerd bepalen de starttime en endtime van de 'workarea' in de comp.Vervolgens loopt dit script door alle layers en bekijkt of de layer Slider Control Data bevat genaamd:* startFrame (1)* endFrame (2)Als een layer deze Effect Control Sliders bevat dan bepalen deze getallen de 'inpoint' en 'outpoint' van een layer.Via expressions kan dan bepaald worden wat de inpoint en outpoints zijn van de verschillende layers.*/function DC_OffsetComplete() {    app.project.timeDisplayType=TimeDisplayType.TIMECODE;    var refCompNaam = "RenderComp" ;    var foundIt = false; // Het is er niet    for (var i = 1; i <= app.project.numItems; i++){        if (app.project.item(i).name == refCompNaam && app.project.item(i) instanceof CompItem ){        var mijnComp = app.project.item(i);        foundIt = true;        //break;        }    }    if (foundIt){    //alert("RenderComp bestaat.");        DC_offsetA();        DC_offsetB();    } else {    alert("is is geen Comp aanwezig met de naam RenderComp" );    }    function DC_getEffects(layer, matchName){        // berekent het aantal effecten in een layer         var matchingEffects = [];        var N,n;        if (layer.effect)        {            N = layer.effect.numProperties;            for (n=1; n<=N; n++) if (layer.effect(n).matchName===matchName) matchingEffects.push(layer.effect(n));        };        return matchingEffects;    }; // Einde DC_getEffects    function DC_offsetA() {    //////////////////////////////////////////////////////////////////////////////////////////////////////    /////////  Layers vastgrijpen en condities bepalen ///////////////////////////////////////////////////    //////////////////////////////////////////////////////////////////////////////////////////////////////    var mijnLayer2 = mijnComp.layers;          for (var i=1; i<mijnLayer2.length+1; i++) { // een loop door alle layers            var thisLayer = mijnComp.layer(i);            //alert(thisLayer.name);                        var layerEffecten = DC_getEffects(thisLayer,"ADBE Slider Control");            var layerEffectenPlus = layerEffecten.length +1;                        if(mijnComp.layer(i).name == "Master_CTRL" ){                                        for (y=1 ; y < layerEffectenPlus ; y++) {                        if (thisLayer.property("Effects")(y).name == "MasterStartFrame") {                             var opgeslagenStartAreaTMP = thisLayer.property("Effects")(y).property("slider").value;                            var opgeslagenStartArea = currentFormatToTime("0:" + opgeslagenStartAreaTMP, mijnComp.frameRate);                          }                           if (thisLayer.property("Effects")(y).name == "MasterEndFrame") {                             var opgeslagenEindAreaTMP = thisLayer.property("Effects")(y).property("slider").value;                            var opgeslagenEindArea = currentFormatToTime("0:" + (opgeslagenEindAreaTMP + 1), mijnComp.frameRate);                            }                  }                         var alleLayers = mijnComp.layers;             mijnComp.workAreaStart = opgeslagenStartArea; // Area Start in Secondes            var areaStartTijd = mijnComp.workAreaStart;            var ingevoerdeTijd = opgeslagenEindArea; // Area eindtijd            mijnComp.workAreaDuration = ingevoerdeTijd - areaStartTijd;                                    }        }    }// einde DC_offset A function    function DC_offsetB() {    //////////////////////////////////////////////////////////////////////////////////////////////////////    /////////  Layers vastgrijpen en condities bepalen ///////////////////////////////////////////////////    //////////////////////////////////////////////////////////////////////////////////////////////////////                var mijnLayer2 = mijnComp.layers;                     for (var i=1; i<mijnLayer2.length+1; i++) { // een loop door alle layers            var thisLayer = mijnComp.layer(i);                        var layerEffecten = DC_getEffects(thisLayer,"ADBE Slider Control");            var layerEffectenPlus = layerEffecten.length +1;                            for (p=1 ; p < layerEffectenPlus ; p++) {                if (thisLayer.property("Effects")(p).name == "startFrame") { // layer offset Inpoint                    var opgeslagenStartFrame = thisLayer.property("Effects")(p).property("slider").value;                     var DC_frameStart = (opgeslagenStartFrame);                      //alert(DC_frameStart);                }                                  if (thisLayer.property("Effects")(p).name == "endFrame") { // layer offset Outpoint                    var opgeslagenEindFrameTmp = thisLayer.property("Effects")(p).property("slider").value;                    var opgeslagenEindFrame = opgeslagenEindFrameTmp +1;                     var DC_frameEinde = opgeslagenEindFrame;                     //alert(opgeslagenEindFrameTmp);                                              //alert(" Layernaam is: " + thisLayer.name + " test frameeinde getal is: " + DC_frameEinde);                }                                     var startTijd = DC_frameStart / mijnComp.frameRate;                var eindTijd = DC_frameEinde / mijnComp.frameRate;                                                    var starten = currentFormatToTime("0:" + (DC_frameStart - 50), mijnComp.frameRate)                var eindigen = currentFormatToTime("0:" + DC_frameEinde, mijnComp.frameRate)                thisLayer.startTime = starten;                thisLayer.outPoint = eindigen;                                           } // einde van de loop        }    } // einde DC_offset B function    } // Einde van de DC_Offset FunctieDC_OffsetComplete();