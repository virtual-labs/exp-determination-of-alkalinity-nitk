var tn=0;
var a,b,c=0;
var n=0;
var op1=0;
var op2=0;
var op3=0;
//starting burette reading =0, final b. r. of normality,starting burette reading =0,final b. r. of phenolphthalien,final b. r. of methyl orange,starting burette reading =0,burette reading for tapwater
var dataSet1=[[0,10,0,2.4,7.6,0,6.8],
		      [0,9.4,0,2.8,9.2,0,5.4],
		      [0,9,0,2.7,9.4,0,5.6],
		      [0,8.4,0,3,10,0,5.5],
		      [0,9.5,0,2.8,12,0,5.9],
		      [0,9.1,0,2.6,9.6,0,5.5],
			  [0,10.1,0,2.1,5,0,6.8]];


var p=Math.floor(Math.random()*(7));

$(function()
{
	$('input').on('input', function() {
		this.value = this.value.match(/\d*(\.\d*)?/)[0];
	});
});

function navNext()
{
	for(temp=0;temp<=23;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

var ca;
var questions=["The absence of alkalinity makes </br>the water _________ .",
				"Alkalinity is due to the absence of bicarbonate </br>and carbonate or hydroxide ions in water?",
				"Alkalinity is expressed as Total alkalinity </br>and Caustic alkalinity when the pH is above _______ .",
				"The phenolphthalein produces pink colour </br>when the pH is above _____ and </br>colourless when the pH is below _______ .",
				"The methyl orange produces _______ colour </br>when the pH is above 4.3 and becomes</br> _________ when the pH is below 4.3.",
				"The amount of HCl consumed to reach the phenolphthalein</br> end point is used to calculate the ___________________ .",
				"Which of the following is correct for Carbonate </br>Alkalinity as CaCO<sub>3</sub>, if the titration </br>result is P=T/2 ? <br>Where P= Phenolpthalein alkalinity,</br>T=Total alkalinity."];
				
var options2=[["Base","Acidic","Neutral","None of these"],//acidic
			  ["True","False"],//false
			  ["4.3","6.3","8.3","10.3"],//8.3
			  ["8.3, 8.3","4.3, 4.3","7.3, 8.3","8.3, 10.3"],//8.3,8.3
			  ["wine red,pale orange","pale orange,wine red","wine red,blue","blue,wine red"],//pale orange,wine red
			  ["Total alkalinity","Methyl orange alkalinity","phenolphthalein alkalinity","None of the above"],//phenolphthalein alkalinity
			  ["2P","T","2P-T","0"]];//2P

function validateAnswer(qn,ans,left,top)
{
	 $("#answer").empty();
	document.getElementById("a").innerHTML="";
	document.getElementById("questDiv").style="position:absolute; font-size:14px; background-color:grey; color:white; padding:7.5px; border-radius:5px; visibility:visible; left:"+left+";top:"+top+";";
	document.getElementById("q").innerHTML=questions[qn];
	el = document.createElement("option");
	el.textContent = " ";
	el.value = " ";
	answer.appendChild(el);
  
	for(j=0;j<options2[qn].length;j++)
	{
		opt = options2[qn][j];

		el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		answer.appendChild(el);
		$("#answer").change(function()
		{
			ca=$(this).children("option:selected").val();
			if(options2[qn][ans]==ca)
			{
				document.getElementById("a").innerHTML="Correct Answer!";
			}
			else
			{
				document.getElementById("a").innerHTML="Wrong! Answer is "+options2[qn][ans];
			}
			setTimeout(function()
			{
				document.getElementById("questDiv").style.visibility="hidden";
				document.getElementById("nextButton").style.visibility="visible";
			},1500);
		});
	}
}


function magic()
{
	if(simsubscreennum==1) //display heading
	{
		$("#1-1").fadeIn(2000);
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility="visible";
		},2000);
	}
	
	if(simsubscreennum==2) //fill  burette with H2SO4
	{
		tn=22;
		step2();
	}
	
	if(simsubscreennum==3) //fill flask with Na2CO3
	{
		tn=3;
		step3();
	}
	
	// if(simsubscreennum==4) //add ammonia buffer
	// {
		// tn=4;
		// stepAddBuffer();
		// //document.getElementById("nextButton").style.visibility="visible";
	// }
	
	if(simsubscreennum==4) //add methyl orange indicator
	{
		// document.getElementById("42Cap").style.visibility="hidden";
		tn=4;
		step4();
	}
	
	if(simsubscreennum==5) // titration
	{
		tn=5;
		a=0
		finalValue=dataSet1[p][1];
		step5();
	}
	if(simsubscreennum==6) //1st calculation
	{
		document.getElementById("59-1knob").style.visibility="hidden";
		document.getElementById("5p9-1").style.visibility="hidden";
		document.getElementById("5p9-3").style.visibility="hidden";
		
		document.getElementById("1").innerHTML=dataSet1[p][0];
		document.getElementById("2").innerHTML=dataSet1[p][1];
		document.getElementById("3").innerHTML=dataSet1[p][1]-dataSet1[p][0];
		
		op1=((10*0.02)/dataSet1[p][1]).toFixed(2);
		op1=parseFloat(op1);
		
		document.getElementById("norm").onclick=function()
		{
			document.getElementById("eqn1").style.visibility="visible";
		}
		
		document.getElementById("check1").onclick=function()
		{
			document.getElementById("eqn1").style.visibility="hidden";
			if(!document.getElementById("output1").value  || !document.getElementById("output1").value!=" ")
			{
				alert("Enter the value to proceed ");
			}
			else
			{
				n = document.getElementById("output1").value;
				
				if(Math.round(n) == Math.round(op1))
				{
					document.getElementById("check1").style.visibility="hidden";
					document.getElementById("norm").style.visibility="hidden";
					document.getElementById("r1").style.visibility="visible";
					document.getElementById("nextButton").style.visibility="visible";
					document.getElementById("result1").style.visibility="hidden";
					document.getElementById("w1").style.visibility="hidden";
					document.getElementById("output1").disabled="true";
					document.getElementById("output1").style="background-color:white; color:black; width:55px;";
				}
				else
				{
					document.getElementById("result1").style.visibility="visible";
					document.getElementById("w1").style.visibility="visible";
				}
			}	
			document.getElementById("result1").onclick=function()
			{
				document.getElementById("eqn1").style.visibility="hidden";
				document.getElementById("display1").style.visibility="visible";
				document.getElementById("display1").innerHTML="Normality of Sulphuric acid = "+ op1 +" N";
				document.getElementById("check1").style.visibility="hidden";
				document.getElementById("result1").style.visibility="hidden";
				document.getElementById("w1").style.visibility="hidden";
				document.getElementById("nextButton").style.visibility="visible";
				document.getElementById("norm").style.visibility="hidden";
				document.getElementById("output1").disabled="true";
				document.getElementById("output1").border="none";
				document.getElementById("output1").style="background-color:white; color:black; width:55px;";
			}
		}
		//document.getElementById("nextButton").style.visibility="visible";
	}
	
// sample titration	
	if(simsubscreennum==7)// second heading
	{
		document.getElementById("display1").style.visibility="hidden";
		document.getElementById("r1").style.visibility="hidden";
		$("#7-1").fadeIn(2000);
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility="visible";
		},2000);
	}
	
	if(simsubscreennum==8)//filling burette
	{
		tn=88;
		step2();
	}
	
	if(simsubscreennum==9)//fill flask with distilled water
	{
		tn=9;
		document.getElementById("9name").style.visibility="visible";
		step3();
	}
	
	// if(simsubscreennum==11)//add ammonia buffer
	// {
		// document.getElementById("9name").style.visibility="hidden";
		// tn=11;
		// stepAddBuffer();
		// //document.getElementById("nextButton").style.visibility="visible";
	// }
	
	if(simsubscreennum==10) //add phenolphthalien indicator
	{
		document.getElementById("9name").style.visibility="hidden";
		// document.getElementById("112Cap").style.visibility="hidden";
		tn=10;
		step10();
	}
	
	if(simsubscreennum==11) //sample  titration on adding phenolphthalien pink to colourless
	{
		document.getElementById("10p10-1").style.visibility="hidden";
		tn=11;
		a=1;
		finalValue=dataSet1[p][3];
		step5();
	}
	
	if(simsubscreennum==12) //2st calculation
	{
		document.getElementById("119-1knob").style.visibility="hidden";
		document.getElementById("11p9-1").style.visibility="hidden";
		document.getElementById("11p9-3").style.visibility="hidden";
		
		document.getElementById("12-11").innerHTML=dataSet1[p][2];
		document.getElementById("12-22").innerHTML=dataSet1[p][3];
		document.getElementById("12-33").innerHTML=dataSet1[p][3]-dataSet1[p][2];
		document.getElementById("12-44").innerHTML=op1;
		
		op2=((op1*dataSet1[p][3]*50*1000)/100).toFixed(2);
		op2=parseFloat(op2);
		document.getElementById("form12-2").onclick=function()
		{
			document.getElementById("eqn12-3").style.visibility="visible";
			document.getElementById("r12-2").style.visibility="hidden";
			document.getElementById("w12-2").style.visibility="hidden";
		}
		
		document.getElementById("check12-2").onclick=function()
		{
			document.getElementById("eqn12-3").style.visibility="hidden";
			if(!document.getElementById("output12-2").value  || document.getElementById("output12-2").value==" ")
			{
				alert("Enter the value to proceed ");
			}
			else
			{
				n = document.getElementById("output12-2").value;
				
				if(Math.round(n) == Math.round(op2))
				{
					document.getElementById("check12-2").style.visibility="hidden";
					document.getElementById("form12-2").style.visibility="hidden";
					document.getElementById("r12-2").style.visibility="visible";
					document.getElementById("nextButton").style.visibility="visible";
					document.getElementById("result12-2").style.visibility="hidden";
					document.getElementById("w12-2").style.visibility="hidden";
					document.getElementById("output12-2").style="border:none; background-color:white;";
					document.getElementById("output12-2").disabled="true";
				}
				else
				{
					document.getElementById("result12-2").style.visibility="visible";
					document.getElementById("w12-2").style.visibility="visible";
				}
			}	
			document.getElementById("result12-2").onclick=function()
			{
				document.getElementById("display12-3").style.visibility="visible";
				document.getElementById("nextButton").style.visibility="visible";
				document.getElementById("display12-3").innerHTML="P as alkalinity of CaCO<sub>3</sub> ="+ op2 +" mg/l ";
				document.getElementById("check12-2").style.visibility="hidden";
				document.getElementById("result12-2").style.visibility="hidden";
				document.getElementById("w12-2").style.visibility="hidden";
				document.getElementById("form12-2").style.visibility="hidden";
				document.getElementById("eqn12-3").style.visibility="hidden";
				document.getElementById("output12-2").style="border:none; background-color:white; color:grey;";
				document.getElementById("output12-2").disabled="true";
			}
		}
	}
	
	if(simsubscreennum==13) // adding methyl orange 
	{
		document.getElementById("w12-2").style.visibility="hidden";
		document.getElementById("r12-2").style.visibility="hidden";
		document.getElementById("display12-3").style.visibility="hidden";
		tn=12;
		step4();
	}
	if(simsubscreennum==14) // titration after adding methyl orange  yellow to winered
	{
		document.getElementById("13p9-1").innerHTML="Initial burette reading = "+dataSet1[p][3]+"ml";
		finalValue=dataSet1[p][4];
		tn=13;
		step5();
	}

	if(simsubscreennum==15) //2st calculation
	{
		document.getElementById("139-1knob").style.visibility="hidden";
		document.getElementById("13p9-1").style.visibility="hidden";
		document.getElementById("13p9-3").style.visibility="hidden";
		
		document.getElementById("11").innerHTML=dataSet1[p][3];
		document.getElementById("22").innerHTML=dataSet1[p][4];
		document.getElementById("33").innerHTML=(dataSet1[p][4]-dataSet1[p][3]).toFixed(2);
		document.getElementById("44").innerHTML=op1;
		var tv=(dataSet1[p][4]-dataSet1[p][3]).toFixed(2);
		op2=((0.02*tv*50000)/100);
		op2=op2;
		document.getElementById("form2").onclick=function()
		{
			document.getElementById("eqn3").style.visibility="visible";
			document.getElementById("r2").style.visibility="hidden";
			document.getElementById("w2").style.visibility="hidden";
		}
		
		document.getElementById("check2").onclick=function()
		{
			document.getElementById("eqn3").style.visibility="hidden";
			if(!document.getElementById("output2").value  || !document.getElementById("output2").value!=" ")
			{
				alert("Enter the value to proceed ");
			}
			else
			{
				n = document.getElementById("output2").value;
				
				if(Math.round(n) == Math.round(op2))
				{
					document.getElementById("check2").style.visibility="hidden";
					document.getElementById("form2").style.visibility="hidden";
					document.getElementById("r2").style.visibility="visible";
					document.getElementById("nextButton").style.visibility="visible";
					document.getElementById("result2").style.visibility="hidden";
					document.getElementById("w2").style.visibility="hidden";
					document.getElementById("output2").style="border:none; background-color:white; width:55px;";
					document.getElementById("output2").disabled="true";
				}
				else
				{
					document.getElementById("result2").style.visibility="visible";
					document.getElementById("w2").style.visibility="visible";
				}
			}	
			document.getElementById("result2").onclick=function()
			{
				document.getElementById("display2").style.visibility="visible";
				document.getElementById("nextButton").style.visibility="visible";
				document.getElementById("display2").innerHTML="T as alkalinity of CaCO<sub>3</sub> = "+ op2.toFixed(2) +" mg/l ";
				document.getElementById("check2").style.visibility="hidden";
				document.getElementById("result2").style.visibility="hidden";
				document.getElementById("w2").style.visibility="hidden";
				document.getElementById("form2").style.visibility="hidden";
				document.getElementById("eqn3").style.visibility="hidden";
				document.getElementById("output2").style="border:none; background-color:white; width:55px;";
				document.getElementById("output2").disabled="true";
			}
		}
	}

	
	// tap water titration	
	if(simsubscreennum==16)// second heading
	{
		document.getElementById("r2").style.visibility="hidden";
		document.getElementById("w2").style.visibility="hidden";
		document.getElementById("display2").style.visibility="hidden";
		$("#15-1").fadeIn(2000);
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility="visible";
		},2000);
	}
	
	if(simsubscreennum==17)//filling burette
	{
		tn=16;
		step2();
	}
	
	if(simsubscreennum==18)//fill flask with distilled water
	{
		tn=17;
		step3();
	}
	
		if(simsubscreennum==19) //add phenolphthalien indicator
	{
		document.getElementById("17name").style.visibility="hidden";
		tn=18;
		step10();
	}
	
	// if(simsubscreennum==19) //sample  titration on adding phenolphthalien pink to colourless
	// {
		// tn=19;
		// a=1;
		// finalValue=dataSet2[p][2];
		// step5();
	// }
	if(simsubscreennum==20) // adding methyl orange 
	{
		document.getElementById("18p18-1").style.visibility="hidden";
		// document.getElementById("199-1knob").style.visibility="hidden";
		// document.getElementById("19p9-1").style.visibility="hidden";
		// document.getElementById("19p9-3").style.visibility="hidden";
		tn=20;
		step4();
	}
	
	if(simsubscreennum==21) // titration after adding methyl orange  yellow to winered
	{
		finalValue=dataSet1[p][6];
		tn=21;
		step5();
	}
	
	if(simsubscreennum==22) //2st calculation
	{
		document.getElementById("219-1knob").style.visibility="hidden";
		document.getElementById("21p9-1").style.visibility="hidden";
		document.getElementById("21p9-3").style.visibility="hidden";
		
		document.getElementById("22-11").innerHTML=dataSet1[p][5];
		document.getElementById("22-22").innerHTML=dataSet1[p][6];
		document.getElementById("22-33").innerHTML=(dataSet1[p][6]-dataSet1[p][5]).toFixed(2);
		document.getElementById("22-44").innerHTML=op1;
		var tv1=(dataSet1[p][6]-dataSet1[p][5]).toFixed(2);
		op3=((0.02*tv1*50000)/100);
		op3=op3.toFixed(2);
		document.getElementById("form3").onclick=function()
		{
			document.getElementById("eqn4").style.visibility="visible";
			document.getElementById("r3").style.visibility="hidden";
			document.getElementById("w3").style.visibility="hidden";
		}
		
		document.getElementById("check3").onclick=function()
		{
			document.getElementById("eqn4").style.visibility="hidden";
			if(!document.getElementById("output3").value  || !document.getElementById("output3").value!=" ")
			{
				alert("Enter the value to proceed ");
			}
			else
			{
				n = document.getElementById("output3").value;
				
				if(Math.round(n) == Math.round(op3))
				{
					document.getElementById("check3").style.visibility="hidden";
					document.getElementById("form3").style.visibility="hidden";
					document.getElementById("r3").style.visibility="visible";
					document.getElementById("result3").style.visibility="hidden";
					document.getElementById("w3").style.visibility="hidden";
					document.getElementById("output3").style="border:none; background-color:white; width:55px;";
					document.getElementById("output3").disabled="true";
					validateAnswer(6,1,"400px","320px");
				}
				else
				{
					document.getElementById("result3").style.visibility="visible";
					document.getElementById("w3").style.visibility="visible";
				}
			}	
			document.getElementById("result3").onclick=function()
			{
				document.getElementById("22display4").innerHTML="T as alkalinity of CaCO<sub>3</sub> = "+ op3 +" mg/l ";
				document.getElementById("check3").style.visibility="hidden";
				document.getElementById("result3").style.visibility="hidden";
				document.getElementById("w3").style.visibility="hidden";
				document.getElementById("form3").style.visibility="hidden";
				document.getElementById("eqn4").style.visibility="hidden";
				document.getElementById("output3").style="border:none; background-color:white; color:black; width:55px;";
				document.getElementById("output3").disabled="true";
				validateAnswer(6,1,"400px","320px");
			}
		}
	}
	if(simsubscreennum==23)
	{
		document.getElementById("check3").style.visibility="hidden";
		document.getElementById("r3").style.visibility="hidden";
		document.getElementById("result3").style.visibility="hidden";
		document.getElementById("w3").style.visibility="hidden";
		document.getElementById("form3").style.visibility="hidden";
		document.getElementById("eqn4").style.visibility="hidden";
		document.getElementById("output3").style.visibility="hidden";
	}
}
function checkInference()
{
	var str;
	document.getElementById("ans").style.visibility="visible";
	if($("input[name='inf']:checked").val()==1)
	{
		document.getElementById("ans").innerHTML="Correct answer!";
	}
	else
	{
		document.getElementById("ans").innerHTML="Wrong! Answer is less than 200mg/l";
	}

	setTimeout(function()
	{
		document.getElementById("inference").style.visibility="hidden";
		if(op3<=200)
		{
			document.getElementById("infAns").innerHTML="Acceptable limit of alkalinity in drinking water is less than 200mg/l. Water with alkalinity beyond this limit taste becomes unpleasant. The water sample given has total alkalinity = "+op3+"mg/l, so it is in the BIS standards range for drinking water.";
		}
		else 
		{
			document.getElementById("infAns").innerHTML="Acceptable limit of alkalinity in drinking water is less than 200mg/l.<br/>Water with alkalinity beyond this limit taste becomes unpleasant. The water sample given has total alkalinity = "+op3+"mg/l, so it is in the BIS standards range for drinking water.";
		}
		$("#infAns").fadeIn(750);
	},1000);
}

function step2()
{
	$("#"+tn+"-2").fadeIn(1500);
		setTimeout(function()
		{
		

		myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:500px; top:300px; height:30px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)";
			document.getElementById("arrow1").style.msTransform="rotate(180deg)";
			document.getElementById("arrow1").style.transform="rotate(180deg)";
			document.getElementById(tn+"-2").onclick=function()
			{
				myStopFunction();
				document.getElementById(tn+"-2").onclick="";
				document.getElementById(tn+"-2").style.animation="moveFunnel 2s forwards";
				setTimeout(function()
				{
					document.getElementById(tn+"-3").style.visibility="visible";
					document.getElementById(tn+"-3Cap").style.visibility="visible";
					setTimeout(function()
					{
						myInt=setInterval(function(){animatearrow();},500);
						document.getElementById("arrow1").style="visibility:visible; position:absolute; left:559px; top:240px; height:30px; z-index:10;";
						document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
						document.getElementById("arrow1").style.msTransform="rotate(270deg)";
						document.getElementById("arrow1").style.transform="rotate(270deg)";
						document.getElementById(tn+"-3Cap").onclick=function()
						{
							myStopFunction();
							document.getElementById(tn+"-3Cap").onclick="";
							document.getElementById(tn+"-3Cap").style.animation="openNa2SO3Cap 2s forwards";
							setTimeout(function()
							{
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="visibility:visible; position:absolute; left:500px; top:350px; height:30px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)";
								document.getElementById("arrow1").style.msTransform="rotate(180deg)";
								document.getElementById("arrow1").style.transform="rotate(180deg)";
								document.getElementById(tn+"-3").onclick=function()
								{
									myStopFunction();
									document.getElementById(tn+"-3").onclick="";
									document.getElementById(tn+"-32").style.visibility="visible";
									document.getElementById(tn+"-3").style.visibility="hidden";
									document.getElementById(tn+"-32").style.animation="moveNa2SO3Bottle 1.5s forwards";
									setTimeout(function()
									{
										document.getElementById(tn+"-32").style="position:absolute; left:375px; top:32px; animation: rotateNa2SO3Bottle 1s forwards;";
										setTimeout(function()
										{
											document.getElementById(tn+"-2samp").style.visibility="visible";
											document.getElementById(tn+"-2samp").style.animation="sampFromFunnelUpDown 2s 7 ";
											setTimeout(function()
											{
												document.getElementById(tn+"-2samp2").style.visibility="visible";
												setTimeout(function()
												{
													document.getElementById(tn+"-2samp3").style.animation="whiteUp 5s forwards";
													setTimeout(function()
													{
														document.getElementById(tn+"-2samp3").style.visibility="hidden";
														document.getElementById(tn+"-2samp4").style.animation="sampFromFunnelUp 5s forwards";
														setTimeout(function()
														{
															document.getElementById(tn+"-2samp2").style.visibility="hidden";
															document.getElementById(tn+"-2samp").style.animation="sampFromFunnelDown2 1.5s forwards ";
															setTimeout(function()
															{
																document.getElementById(tn+"-2samp").style.visibility="hidden";
																document.getElementById(tn+"-2samp4").style="position:absolute; left:240px; top:185px;";
																document.getElementById(tn+"-2samp4").style.animation="sampFromFunnelUp2 1.5s forwards";
																document.getElementById(tn+"-32").style.animation="rotateNa2SO3Bottle2 1.5s forwards";
																setTimeout(function()
																{
																	document.getElementById(tn+"-32").style.animation="moveNa2SO3BottleBack 1.5s forwards";
																	setTimeout(function()
																	{
																		document.getElementById(tn+"-32").style.visibility="hidden";
																		document.getElementById(tn+"-3").style.visibility="visible";
																		
																		myInt=setInterval(function(){animatearrow();},500);
																		document.getElementById("arrow1").style="visibility:visible; position:absolute; left:644px; top:320px; height:30px; z-index:10;";
																		document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
																		document.getElementById("arrow1").style.msTransform="rotate(270deg)";
																		document.getElementById("arrow1").style.transform="rotate(270deg)";
																		document.getElementById(tn+"-3Cap").onclick=function()
																		{
																			myStopFunction();
																			document.getElementById(tn+"-3Cap").onclick="";
																			document.getElementById(tn+"-3Cap").style.animation="closeNa2SO3Cap 2s forwards";
																			setTimeout(function()
																			{
																				document.getElementById(tn+"-3Cap").style.visibility="hidden";
																				document.getElementById(tn+"-3").style.visibility="hidden";
																				
																				myInt=setInterval(function(){animatearrow();},500);
																				document.getElementById("arrow1").style="visibility:visible; position:absolute; left:420px; top:155px; height:30px; z-index:10;";
																				document.getElementById("arrow1").style.WebkitTransform="rotate(0deg)";
																				document.getElementById("arrow1").style.msTransform="rotate(0deg)";
																				document.getElementById("arrow1").style.transform="rotate(0deg)";
																				document.getElementById(tn+"-2").onclick=function()
																				{
																					myStopFunction();
																					document.getElementById(tn+"-2").onclick="";
																					document.getElementById(tn+"-2").style.animation="moveFunnelBack 2s forwards";
																					setTimeout(function()
																					{
																						$("#"+tn+"-2").fadeOut(800);
																						if(tn==88 || tn==16)
																						{
																							document.getElementById("nextButton").style.visibility="visible";
																						}
																						if(tn==22)
																						{
																							validateAnswer(0,1,"450px","150px");
																						}
																					},2100);
																				}
																			},2100);
																		}
																	},1600);
																},1000);
															},800);
														},5000);
													},4500);
												},800);
											},1000);
										},1100);
									},1550);
								}
							},2100);
						}
					},250);
				},2100);
			}
		},1500);
	
}

function step3()
{
	setTimeout(function()
			{
				document.getElementById(tn+"p3-1").style.visibility="visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:295px; top:190px; height: 30px; z-index: 10;";
				document.getElementById("arrow1").style.WebkitTransform = "rotate(220deg)"; 
		     // Code for IE9
				document.getElementById("arrow1").style.msTransform = "rotate(220deg)"; 
		     // Standard syntax
				document.getElementById("arrow1").style.transform = "rotate(220deg)";
				document.getElementById(tn+"-4").onclick=function()
				{
					myStopFunction();
					document.getElementById(tn+"-4").onclick="";
					document.getElementById(tn+"-4").style.visibility="hidden";
					document.getElementById(tn+"p3-1").style.visibility="hidden";
					document.getElementById(tn+"-41").style.visibility="visible";
					setTimeout(function()
					{
						document.getElementById(tn+"-41").style.animation="moveGP1 1.5s forwards";
						setTimeout(function()
						{
							$("#"+tn+"-5bulb").fadeIn(1000);
							$("#"+tn+"-5up").fadeIn(1000);
							$("#"+tn+"-5down").fadeIn(1000);
							setTimeout(function()
							{
								document.getElementById(tn+"p3-2").style.visibility="visible";
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="position:absolute; visibility:visible; left:321px; top:300px; height:20px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
								// Code for IE9
								document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
								// Standard syntax
								document.getElementById("arrow1").style.transform = "rotate(180deg)";
								document.getElementById(tn+"-5up").onclick=function()
								{
									myStopFunction();
									document.getElementById(tn+"-5up").onclick="";
									document.getElementById(tn+"p3-2").style.visibility="hidden";
									$("#"+tn+"-5bulb").fadeOut(1500);
									$("#"+tn+"-5up").fadeOut(1500);
									$("#"+tn+"-5down").fadeOut(1500);
									document.getElementById(tn+"-41sw").style.visibility="visible";
									document.getElementById(tn+"-41sw").style.animation="h2so4Up 2s forwards";
									document.getElementById(tn+"-3").style.animation="h2so4Down 2s forwards";
									setTimeout(function()
									{
										document.getElementById(tn+"-41sw").style.visibility="hidden";
										document.getElementById(tn+"-41").style.visibility="hidden";
										document.getElementById(tn+"-42").style.visibility="visible";
									    													
													 myInt = setInterval(function(){ animatearrow(); }, 500);
													document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:450px; top:230px; height: 35px; z-index: 10;";
													document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
													// Code for IE9
													document.getElementById("arrow1").style.msTransform = "rotate(180deg)";
													// Standard syntax
													document.getElementById("arrow1").style.transform = "rotate(180deg)";
													document.getElementById(tn+"-42").onclick=function()
													{  
														myStopFunction();
														document.getElementById(tn+"-42").onclick="";
														document.getElementById(tn+"-42").style.animation="moveGP3 3s forwards";
														setTimeout(function()
														{   
															$("#"+tn+"-5bulb").fadeIn(1500);
															$("#"+tn+"-5up").fadeIn(1500);
															$("#"+tn+"-5down").fadeIn(1500);
															document.getElementById(tn+"p3-2").style="visibility:visible; position:absolute; left:350px; top:100px; color:red; font-size:14px;";
															document.getElementById(tn+"p3-2").innerHTML="Press the down arrow on the bulb </br></br>to release the liquid";
															setTimeout(function()
															{
																document.getElementById(tn+"p3-2").style.visibility="visible";
																myInt=setInterval(function(){animatearrow();},500);
																document.getElementById("arrow1").style="position:absolute; visibility:visible; left:358px; top:330px; height:20px; z-index:10;";
																document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
																// Code for IE9
																document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
																// Standard syntax
																document.getElementById("arrow1").style.transform = "rotate(90deg)";
																document.getElementById(tn+"-5down").onclick=function()
																{
																	myStopFunction();
																	document.getElementById(tn+"-5down").onclick="";
																	document.getElementById(tn+"p3-2").style.visibility="hidden";
																	$("#"+tn+"-5bulb").fadeOut(1000);
																	$("#"+tn+"-5up").fadeOut(1000);
																	$("#"+tn+"-5down").fadeOut(1000);
																	document.getElementById(tn+"-41").style="visibility:visible; position:absolute; left:76px; top:100px;";
																	document.getElementById(tn+"-43").style.visibility="visible";
																	
																	document.getElementById(tn+"-42").style.visibility="hidden";

																	document.getElementById(tn+"-43").style.animation="NaClDown 2s forwards";
																	setTimeout(function()
																	{
																	document.getElementById(tn+"-1samp1").style.animation="NaClUp 2s forwards";
																	setTimeout(function()
																	{
																		document.getElementById(tn+"-41").style.animation="movebackGP 1.5s forwards";
																		setTimeout(function()
																		{
																																						
																			$("#"+tn+"-41").fadeOut(1200);
																			setTimeout(function()
																					{
																						document.getElementById(tn+"-43").style.visibility="hidden";
																						if(tn==9 || tn==17)
																						{
																							document.getElementById("nextButton").style.visibility="visible";
																						}
																						if(tn==3)
																						{
																							validateAnswer(1,1,"150px","150px");
																						}
																					},1400);
																			},1750);
																	},2300);
																	},200);
																}
															},1000);
														},3100);
													}
												//},1250);
														
										},2100);
								}
							},1100);
						},1600);
						
					},150);
				}
			},500);
}

function step4()
{
	setTimeout(function()
	{
		myInt=setInterval(function(){animatearrow();},500);
		document.getElementById("arrow1").style="position:absolute; visibility:visible; left:508px; top:285px; height:35px; z-index:10;";
		document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
		// Standard syntax
        document.getElementById("arrow1").style.transform = "rotate(270deg)";
		document.getElementById(tn+"-3a").onclick=function()
		{
			myStopFunction();
			document.getElementById(tn+"-3a").onclick="";
			document.getElementById(tn+"-3a").style.animation="openEBTBottle 1.5s forwards";

			setTimeout(function()
			{
				$("#"+tn+"-4a").fadeIn(1500);
		setTimeout(function()
		{
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:455px; top:205px; height:35px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)";
			document.getElementById("arrow1").style.msTransform="rotate(180deg)";
			document.getElementById("arrow1").style.transform="rotate(180deg)";
			document.getElementById(tn+"-4a").onclick=function()
			{
				myStopFunction();
				document.getElementById(tn+"-4a").onclick="";
				document.getElementById(tn+"-4a").style.animation="moveDropper 1.5s forwards";
				setTimeout(function()
				{
					document.getElementById(tn+"-2a").style.animation="K2Cr2O4Down 1.5s forwards";
					document.getElementById(tn+"-2b").style.animation="K2Cr2O4Up 1.5s forwards";
					setTimeout(function()
					{
						$("#"+tn+"-4a").fadeOut(0);
						document.getElementById(tn+"-4b").style.visibility="visible";
						document.getElementById(tn+"-2b").style.visibility="hidden";//yellow colour
						myInt=setInterval(function(){animatearrow();},500);
						document.getElementById("arrow1").style="visibility:visible; position:absolute; left:510px; top:240px; height:35px; z-index:10;";
						document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
						document.getElementById("arrow1").style.msTransform="rotate(270deg)";
						document.getElementById("arrow1").style.transform="rotate(270deg)";
						document.getElementById(tn+"-4b").onclick=function()
						{
							myStopFunction();
							document.getElementById(tn+"-4b").onclick="";
							document.getElementById(tn+"-4b").style.animation="moveDropper2 2s forwards";
							setTimeout(function()
							{
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="visibility:visible; position:absolute; left:60px; top:220px; height:35px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)";
								document.getElementById("arrow1").style.msTransform="rotate(180deg)";
								document.getElementById("arrow1").style.transform="rotate(180deg)";
								document.getElementById(tn+"-4b").onclick=function()
								{
									myStopFunction();
									document.getElementById(tn+"-4b").onclick="";
									document.getElementById(tn+"-4a").style="visibility:visible; position:absolute; left:81px; top:150px;";
									document.getElementById(tn+"-2c").style.visibility="visible";
									document.getElementById(tn+"-4b").style.visibility="hidden";
									setTimeout(function()
									{
										document.getElementById(tn+"-2c").style.animation="K2Cr2O4Down2 4s forwards";
										document.getElementById(tn+"drop4-1").style.visibility="visible";
										document.getElementById(tn+"drop4-1").style.animation="dropK2Cr2O4 1s 2";
										setTimeout(function()
										{
											document.getElementById(tn+"-0").style.borderColor="#F8F8F8";
											document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#FFFF66 ,#F8F8F8 30% )";
											setTimeout(function()
											{
												document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#FFFF66 ,#F8F8F8 65% )";
												setTimeout(function()
												{
													document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#FFFF66 ,#FFFF66  )";
												
																		//document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#F8F8F8,#da2c24 20%)";
																				
																		document.getElementById(tn+"drop4-1").style.visibility="hidden";
																		document.getElementById(tn+"-2c").style.visibility="hidden";
																		$("#"+tn+"-4a").fadeOut(200);
																		setTimeout(function()
																		{
																			myInt=setInterval(function(){animatearrow();},500);
																			document.getElementById("arrow1").style="position:absolute; visibility:visible; left:600px; top:355px; height:35px; z-index:10;";
																			document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
																			// Code for IE9
																			document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
																			// Standard syntax
																			document.getElementById("arrow1").style.transform = "rotate(270deg)";
																			document.getElementById(tn+"-3a").onclick=function()
																			{
																				myStopFunction();
																				document.getElementById(tn+"-3a").onclick="";
																				document.getElementById(tn+"-3a").style="position:absolute; left:555px; top:355px;";
																				document.getElementById(tn+"-3a").style.animation="closeEBTBottle 1.5s forwards";
																				setTimeout(function()
																				{
																					if(tn==4 || tn==12)
																					{
																						document.getElementById("nextButton").style.visibility="visible";
																					}
																					if(tn==20)
																					{
																						validateAnswer(4,1,"100px","175px");
																					}
																				},1600);
																			}
																		},250);
																	
																
											},500);
											},750);
										},750);
									},200);
								}
							},2000);
						}
					},1500);

				},1750);
			}
		},1500);

			},1500);
			
		}
	},500);
}

function step5()
{
	setTimeout(function()
		{
			document.getElementById(tn+"p9-0a").style.visibility="visible";
			document.getElementById(tn+"p9-1").style.visibility="visible";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:225px; top:320px; height: 35px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(300deg)"; 
				// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(300deg)"; 
				// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(300deg)";
			document.getElementById(tn+"9-1knob").onclick=function()
			{
				myStopFunction();
				document.getElementById(tn+"9-1knob").onclick="";	
				document.getElementById(tn+"9-1knob").style.visibility="hidden";
				document.getElementById(tn+"9-1hand").style.visibility="visible";
				setTimeout(function()
				{
					document.getElementById(tn+"p9-0a").style.visibility="hidden";
					document.getElementById(tn+"9-1hand").style.visibility="hidden";
					document.getElementById(tn+"9-1hand2").style.visibility="visible";
					document.getElementById(tn+"9-1stopper").style="position:absolute; left:153px; top:309.75px;";
					setTimeout(function()
					{
						document.getElementById(tn+"drop9-1").style.visibility="visible";
						document.getElementById(tn+"drop9-1").style.animation="drop2 0.75s 15";
						if(tn==5 || tn==11 || tn==19)
						{
							document.getElementById(tn+"9-1a").style.animation="Na2S2O3fromBurette1 10s forwards";
						}
						if(tn==13 || tn==21)
						{
							document.getElementById(tn+"9-1a").style.animation="Na2S2O3fromBurette2 10s forwards";
						}
						
						setTimeout(function()
						{
							document.getElementById(tn+"drop9-2").style.visibility="visible";
							document.getElementById(tn+"drop9-2").style.animation="drop2 0.75s 15";
							setTimeout(function()
							{
								if(tn==5 || tn==13 || tn==21)
								{
									document.getElementById(tn+"9-3").style.animation="colourChange2 13s forwards";
								}
								if(tn==11)
								{
									document.getElementById(tn+"9-3").style.animation="colourChange4 13s forwards";
								}
								setTimeout(function()
								{
										document.getElementById(tn+"drop9-1").style.visibility="hidden";
										document.getElementById(tn+"drop9-2").style.visibility="hidden";
										document.getElementById(tn+"9-1hand").style.visibility="visible";
										document.getElementById(tn+"9-1hand2").style.visibility="hidden";
										document.getElementById(tn+"9-1stopper").style="position:absolute; left:150px; top:307.75px; ";
										setTimeout(function()
										{
											document.getElementById(tn+"9-1knob").style.visibility="visible";
											document.getElementById(tn+"9-1hand").style.visibility="hidden";
											setTimeout(function()
											{
												document.getElementById(tn+"p9-3").style.visibility="visible";
												document.getElementById(tn+"p9-3").innerHTML="Final burette reading = "+finalValue+"ml";
												if(tn==5 || tn==13 || tn==19 || tn==21)
												{
													document.getElementById("nextButton").style.visibility="visible";
												}
												if(tn==11)
												{
													validateAnswer(5,2,"300px","300px");
												}
											},500);
										},750);
									//},1000);
								},12200);
							},250);
						},250);
					},100);
				},250);
			}
		},500);

}

function stepAddBuffer()
{
	$("#"+tn+"4Up").fadeIn(1500);
		setTimeout(function()
		{
			document.getElementById(tn+"4button").style.visibility="visible";
		// $("#p2-1").fadeIn(6500);
		
		setTimeout(function()
		{
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left: 280px; top: 232.5px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(225deg)"; 
			// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(225deg)"; 
			// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(225deg)";
			document.getElementById(tn+"4button").onclick=function()
			{
				myStopFunction();
				document.getElementById(tn+"4button").onclick="";	
				document.getElementById(tn+"4Up").style.visibility="hidden";
				document.getElementById(tn+"4button").style.visibility="hidden";
				document.getElementById(tn+"4Down").style.visibility="visible";
			    setTimeout(function()
				{
					myInt = setInterval(function(){ animatearrow(); }, 500);
					document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:505px; top:260px; height: 30px; z-index: 10;";
					document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
					// Code for IE9
					document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
					// Standard syntax
					document.getElementById("arrow1").style.transform = "rotate(270deg)";
					document.getElementById(tn+"2Cap").onclick=function()
					{
						myStopFunction();
						document.getElementById(tn+"2Cap").onclick="";	
						document.getElementById(tn+"2Cap").style.visibility="hidden";
						document.getElementById(tn+"2Cap2").style.visibility="visible";
						document.getElementById(tn+"2Cap2").style.animation="openBottleCap3 1.25s forwards";
				setTimeout(function()
				{
					document.getElementById(tn+"2Cap").style="position:absolute; visibility:visible; left:540px; top:335px; width:25px;";
					document.getElementById(tn+"2Cap2").style.visibility="hidden";
					myInt = setInterval(function(){ animatearrow(); }, 500);
					document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left: 240px; top: 320px; height: 40px; z-index: 10;";
					document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
					// Code for IE9
					document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
					// Standard syntax
					document.getElementById("arrow1").style.transform = "rotate(180deg)";
					document.getElementById(tn+"4Down").onclick=function()
					{
						myStopFunction();
						document.getElementById(tn+"4Down").onclick="";
						document.getElementById(tn+"4Down").style.animation="movePipette3-1 2s forwards";
						setTimeout(function()
						{
							// document.getElementById(tn+"3").style.animation="aiasDown 1s forwards";
							document.getElementById(tn+"4Up2").style.visibility="visible";
							document.getElementById(tn+"4Down").style.visibility="hidden";
							setTimeout(function()
							{
								document.getElementById(tn+"4Up2").style.animation="movePipette2 2s forwards";
								setTimeout(function()
								{
									myInt = setInterval(function(){ animatearrow(); }, 500);
									document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:580px; top:330px; height: 35px; z-index: 10;";
									document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
									// Code for IE9
									document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
									// Standard syntax
									document.getElementById("arrow1").style.transform = "rotate(270deg)";
									document.getElementById(tn+"2Cap").onclick=function()
									{
										myStopFunction();
										document.getElementById(tn+"2Cap").onclick="";	
										document.getElementById(tn+"2Cap").style.visibility="hidden";
										document.getElementById(tn+"2Cap2").style="left:520px; top:290px;; position:absolute; visibility:visible";
										document.getElementById(tn+"2Cap2").style.animation="closeBottleCap3 1.25s forwards";
									
								setTimeout(function()
								{
									document.getElementById(tn+"2Cap2").style.visibility="hidden";
									document.getElementById(tn+"2Cap").style="visibility:visible; position:absolute; left:460px; top:253px; width:25px;";
									
									setTimeout(function()
												{
													myInt = setInterval(function(){ animatearrow(); }, 500);
													document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:260px; top:340px; height: 40px; z-index: 10;";
													document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
													// Code for IE9
													document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
														// Standard syntax
													document.getElementById("arrow1").style.transform = "rotate(180deg)";
													document.getElementById(tn+"4Up2").onclick=function()
													{
														myStopFunction();
														document.getElementById(tn+"4Up2").onclick="";	
														document.getElementById(tn+"4Up2").style="position:absolute; left: 256px; top: 200px;";
														document.getElementById(tn+"4Up2").style.animation="movePipette3 2s forwards";
														
														setTimeout(function()
														{
															myInt = setInterval(function(){ animatearrow(); }, 500);
															document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:60px; top:230px; height: 35px; z-index: 10;";
															document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
															// Code for IE9
															document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
															// Standard syntax
															document.getElementById("arrow1").style.transform = "rotate(180deg)";
															document.getElementById(tn+"4Up2").onclick=function()
															{
																myStopFunction();
																document.getElementById(tn+"4Up2").onclick="";
																document.getElementById(tn+"4Up2").style.visibility="hidden";
																document.getElementById(tn+"4Down2").style.visibility="visible";
																document.getElementById(tn+"1samp2").style.visibility="visible";
																setTimeout(function()
																{
																	document.getElementById(tn+"1samp2").style.animation="bufferDown 2.5s forwards";
																	document.getElementById(tn+"drop4-3").style.visibility="visible";
																	document.getElementById(tn+"drop4-3").style.animation="dropNHBuffer 0.5s 4";
																	document.getElementById(tn+"1samp1").style.animation="moveSolutionUp1 3s forwards";
																	setTimeout(function()
																	{
																		document.getElementById(tn+"1samp2").style.visibility="hidden";
																		document.getElementById(tn+"drop4-3").style.visibility="hidden";
																		setTimeout(function()
																		{
																			document.getElementById(tn+"4Down2").style.animation="movePipetteBack 2s forwards";
																			setTimeout(function()
																			{
																				$("#"+tn+"4Down2").hide(1000);
																				setTimeout(function()
																				{
																					document.getElementById("nextButton").style.visibility="visible";
																				},1200);
																			},2000);
																		},200);
																	},2000);
																},100);
															}							
														},2500);
													}
												},100);
									},1200);
								  }
								},2000);
							},500);
						},2500);
					  }
			
				  },1300);	
				}
			  },700);
			}
		},300);
	
	  },1300);
}

function step10()
{
	setTimeout(function()
	{
		myInt=setInterval(function(){animatearrow();},500);
		document.getElementById("arrow1").style="position:absolute; visibility:visible; left:508px; top:285px; height:35px; z-index:10;";
		document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
		// Standard syntax
        document.getElementById("arrow1").style.transform = "rotate(270deg)";
		document.getElementById(tn+"-3a").onclick=function()
		{
			myStopFunction();
			document.getElementById(tn+"-3a").onclick="";
			document.getElementById(tn+"-3a").style.animation="openEBTBottle 1.5s forwards";

			setTimeout(function()
			{
				$("#"+tn+"-4a").fadeIn(1500);
		setTimeout(function()
		{
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:455px; top:205px; height:35px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)";
			document.getElementById("arrow1").style.msTransform="rotate(180deg)";
			document.getElementById("arrow1").style.transform="rotate(180deg)";
			document.getElementById(tn+"-4a").onclick=function()
			{
				myStopFunction();
				document.getElementById(tn+"-4a").onclick="";
				document.getElementById(tn+"-4a").style.animation="moveDropper 1.5s forwards";
				setTimeout(function()
				{
					document.getElementById(tn+"-2a").style.animation="K2Cr2O4Down 1.5s forwards";
					document.getElementById(tn+"-2b").style.animation="K2Cr2O4Up 1.5s forwards";
					setTimeout(function()
					{
						$("#"+tn+"-4a").fadeOut(0);
						document.getElementById(tn+"-4b").style.visibility="visible";
						document.getElementById(tn+"-2b").style.visibility="hidden";//yellow colour
						myInt=setInterval(function(){animatearrow();},500);
						document.getElementById("arrow1").style="visibility:visible; position:absolute; left:510px; top:240px; height:35px; z-index:10;";
						document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
						document.getElementById("arrow1").style.msTransform="rotate(270deg)";
						document.getElementById("arrow1").style.transform="rotate(270deg)";
						document.getElementById(tn+"-4b").onclick=function()
						{
							myStopFunction();
							document.getElementById(tn+"-4b").onclick="";
							document.getElementById(tn+"-4b").style.animation="moveDropper2 2s forwards";
							setTimeout(function()
							{
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="visibility:visible; position:absolute; left:60px; top:220px; height:35px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)";
								document.getElementById("arrow1").style.msTransform="rotate(180deg)";
								document.getElementById("arrow1").style.transform="rotate(180deg)";
								document.getElementById(tn+"-4b").onclick=function()
								{
									myStopFunction();
									document.getElementById(tn+"-4b").onclick="";
									document.getElementById(tn+"-4a").style="visibility:visible; position:absolute; left:81px; top:150px;";
									document.getElementById(tn+"-2c").style.visibility="visible";
									document.getElementById(tn+"-4b").style.visibility="hidden";
									setTimeout(function()
									{
										document.getElementById(tn+"-2c").style.animation="K2Cr2O4Down2 4s forwards";
										document.getElementById(tn+"drop4-1").style.visibility="visible";
										document.getElementById(tn+"drop4-1").style.animation="dropK2Cr2O4 1s 2";
										setTimeout(function()
										{
											document.getElementById(tn+"-0").style.borderColor="#F8F8F8";
											if(tn!=18)
											{
												document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#FFC0CB, #F8F8F8 30% )";
											}
											setTimeout(function()
											{
												if(tn!=18)
												{
													document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#FFC0CB, #F8F8F8 65% )";
												}
												setTimeout(function()
												{
													if(tn!=18)
													{
														document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#FFC0CB, #FFC0CB  )";
													}
																		//document.getElementById(tn+"-0").style.backgroundImage="linear-gradient(#F8F8F8,#da2c24 20%)";
																	if(tn==18)
																	{
																		document.getElementById(tn+"p18-1").style.visibility="visible";
																	}																
																		document.getElementById(tn+"drop4-1").style.visibility="hidden";
																		document.getElementById(tn+"-2c").style.visibility="hidden";
																		$("#"+tn+"-4a").fadeOut(200);
																		setTimeout(function()
																		{
																			myInt=setInterval(function(){animatearrow();},500);
																			document.getElementById("arrow1").style="position:absolute; visibility:visible; left:600px; top:355px; height:35px; z-index:10;";
																			document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
																			// Code for IE9
																			document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
																			// Standard syntax
																			document.getElementById("arrow1").style.transform = "rotate(270deg)";
																			document.getElementById(tn+"-3a").onclick=function()
																			{
																				myStopFunction();
																				document.getElementById(tn+"-3a").onclick="";
																				document.getElementById(tn+"-3a").style="position:absolute; left:555px; top:355px;";
																				document.getElementById(tn+"-3a").style.animation="closeEBTBottle 1.5s forwards";
																				setTimeout(function()
																				{
																					if(tn==18)
																					{
																						document.getElementById("nextButton").style.visibility="visible";
																					}
																					if(tn==10)
																					{
																						document.getElementById("10p10-1").style.visibility="visible";
																						setTimeout(function()
																						{
																							validateAnswer(3,0,"50px","150px");
																						},300);
																					}
																				},1600);
																			}
																		},250);
																	
																
											},500);
											},750);
										},750);
									},200);
								}
							},2000);
						}
					},1500);

				},1750);
			}
		},1500);

			},1500);
			
		}
	},500);
}


	
function refresh()
{
	document.getElementById("22-2").style.animation="";
	document.getElementById("22-3Cap").style.animation=	"";
	document.getElementById("22-32").style.animation="";
	document.getElementById("22-2samp4").style.animation="";
	document.getElementById("22-2samp").style.animation="";
	document.getElementById("22-2samp2").style.animation="";
	document.getElementById("22-2samp3").style.animation="";
}
