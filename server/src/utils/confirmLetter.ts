export const getConfirmLetter = (link: string) => {
    return `
		<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<meta name="x-apple-disable-message-reformatting">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="telephone=no" name="format-detection">
	<title>Sale of cars</title>
	<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

</head>

<body>
	<div dir="ltr" class="es-wrapper-color">
		<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
			<tbody>
				<tr>
					<td class="esd-email-paddings" valign="top">
						<table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
							<tbody>
								<tr>
									<td class="esd-stripe" align="center"
										style="background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial;">
										<table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
											width="600" style="background-color: transparent;">
											<tbody>
												<tr>
													<td class="esd-structure es-p40t es-p40b es-p20r es-p20l"
														align="left"
														style="border-radius: 20px; background-image: url(https://tlr.stripocdn.email/content/guids/CABINET_9b143e749e3aaed3697507da71b3bd7b7e0aa7b60b3fdc77ad722f0ebae80f8e/images/meshgradient_3.png); background-repeat: no-repeat; background-position: center center;"
														background="https://tlr.stripocdn.email/content/guids/CABINET_9b143e749e3aaed3697507da71b3bd7b7e0aa7b60b3fdc77ad722f0ebae80f8e/images/meshgradient_3.png">
														<table cellpadding="0" cellspacing="0" width="100%">
															<tbody>
																<tr>
																	<td width="560" class="esd-container-frame"
																		align="center" valign="top">
																		<table cellpadding="0" cellspacing="0"
																			width="100%">
																			<tbody>
																				<tr>
																					<td align="center"
																						class="esd-block-text es-m-txt-l">
																						<h1>Welcome to<br></h1>
																						<h1>CARS-SALE!&nbsp;</h1>
																					</td>
																				</tr>
																				<tr>
																					<td align="center"
																						class="esd-block-text es-p20t es-p30b es-p15r es-p15l es-m-p0r es-m-p0l es-m-txt-l">
																						<p>We're excited to have you get
																							started. First, you need to
																							confirm your account.</br>
																							Just press the button below.
																						</p>
																						<p></p>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
																<tr>
																	<td width="560" height="30"
																		class="esd-container-frame" align="center"
																		valign="top">
																		<table cellpadding="0" cellspacing="0"
																			width="100%">
																			<tbody>
																				<tr>
																					<td align="center"
																						class="esd-block-button es-p20t">
																						<span
																							class="es-button-border" text-decoration="none"><a
																								href="${link}"
																								class="es-button button"
																								target="_blank">Confirm
																								Account</a></span></td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td class="esd-structure es-p20t es-p20r es-p20l" align="left">
														<table cellpadding="0" cellspacing="0" width="100%">
															<tbody>
																<tr>
																	<td width="560" class="esd-container-frame"
																		align="center" valign="top">
																		<table cellpadding="0" cellspacing="0"
																			width="100%">
																			<tbody>
																				<tr>
																					<td align="center"
																						class="esd-block-spacer"
																						height="0"></td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</body>

</html>	
	`;
};
