//Prompt the user for a new folder locationvar newLocation = folderGetDialog("Select a render destination...");//Set active RQItems to render to the new locationif (newLocation) { //boolean to see if the user cancelled	for (i = 1; i <= app.project.renderQueue.numItems; ++i) {		var curItem = app.project.renderQueue.item(i);				if (curItem.status == RQItemStatus.QUEUED) {			for (j = 1; j <= curItem.numOutputModules; ++j) {				var curOM = curItem.outputModule(j);								var oldLocation = curOM.file;				curOM.file = new File(newLocation.toString() + "/" + oldLocation.name);								alert(curOM.file.fsName);			}		}	}}