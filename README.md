DC_Offset_Clean_v0.0.1
======================

An after effects script to offset multiple layers

DC_Offset: R.P. da Costa 2014
Version: 0.0.1

DC_Offset zoekt een comp met de naam "RenderComp" en bekijkt de layers die erin zitten.
Vervolgens gebruikt dit script een (NULL) object layer genaamd Master_CTRL.
Master_CTRL bevat twee Effect Control Sliders.
* MasterStartFrame (1)
* MasterEndFrame (2)
De getallen die hierin worden ingevoerd bepalen de starttime en endtime van de 'workarea' in de comp.

Vervolgens loopt dit script door alle layers en bekijkt of de layer Slider Control Data bevat genaamd:
* startFrame (1)
* endFrame (2)
Als een layer deze Effect Control Sliders bevat dan bepalen deze getallen de 'inpoint' en 'outpoint' van een layer.
Via expressions kan dan bepaald worden wat de inpoint en outpoints zijn van de verschillende layers.
