


select * from TB_USUARIO
select * from TB_EMPRESA_INFO
drop table TB_EMPRESA_INFO

-- ====================================================================================

CREATE TABLE `TB_USUARIO` (
	id int  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `correo_corporativo` varchar(200) ,
  `clave` varchar(200) DEFAULT NULL,
  `nombres_completo` varchar(200) DEFAULT NULL,
	`nombre_empresa` varchar(200) DEFAULT NULL,
	`celular` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `fecha_reg` datetime DEFAULT NULL,
	UNIQUE (correo_corporativo)
) 


create table TB_EMPRESA_INFO(
idusuario int PRIMARY KEY,
nombre varchar(200),
ubicacion varchar(200),
url_perfil varchar(200),
actualizacion datetime
)

-- ====================================================================================

CREATE PROCEDURE SP_S_LOGIN(
in p_correo varchar(200), 
in p_clave varchar(200)
)
BEGIN
	select u.id,	u.correo_corporativo, u.nombres_completo, u.nombre_empresa, u.celular
	from 	TB_USUARIO as u
	where u.estado = 1 and u.correo_corporativo=p_correo and u.clave=md5(p_clave);
END

-- ====================================================================================
CREATE PROCEDURE SP_I_USUARIO(
IN p_correo_corporativo varchar(200),
IN p_clave varchar (200),
IN p_nombres_completo varchar(200),
IN p_nombre_empresa varchar(200),
IN p_celular varchar(50),
In p_estado int
)
BEGIN
	insert into TB_USUARIO(
	correo_corporativo,
	clave,
	nombres_completo,
	nombre_empresa,
	celular,
	estado,
	fecha_reg)
	values(
	p_correo_corporativo,
	MD5(p_clave),
	p_nombres_completo,
	p_nombre_empresa,
	p_celular,
	p_estado,
	NOW());
END

-- ====================================================================================

CREATE PROCEDURE SP_S_VALIDAR_REG_USU(
in p_correo varchar(200), 
in p_clave varchar(200)
)
BEGIN

	select 	*
	from 	TB_USUARIO as u
	where u.estado = 2 and u.correo_corporativo=p_correo and u.clave=md5(p_clave);

END
-- ====================================================================================

CREATE PROCEDURE SP_U_ESTADO_USUARIO(
IN p_correo_corporativo varchar(200)
)
BEGIN
	update TB_USUARIO set estado = 1 
	where correo_corporativo = p_correo_corporativo;
END

-- ====================================================================================
CREATE PROCEDURE SP_S_EXISTE_LOGIN(
in p_correo varchar(200)
)
BEGIN
	select 	*
	from 		TB_USUARIO as u
	where 	u.correo_corporativo=p_correo;
END

-- ====================================================================================
create PROCEDURE SP_I_EMPRESA_INFO(
IN p_idusuario int,
IN p_correo_corporativo varchar(200),
IN p_nombre varchar(200),
IN p_ubicacion varchar(200),
IN p_url_perfil varchar(200)
)
BEGIN

if exists(select * from TB_EMPRESA_INFO where correo_corporativo = p_correo_corporativo) then

	update TB_EMPRESA_INFO set nombre = p_nombre,
	ubicacion = p_ubicacion,
	url_perfil = p_url_perfil,
	actualizacion = NOW()
	where idusuario = p_idusuario;

else

	INSERT INTO TB_EMPRESA_INFO(idusuario,nombre,ubicacion,url_perfil,actualizacion)
	values(p_idusuario,p_nombre,p_ubicacion,p_url_perfil,NOW());
end if;

END 

-- ====================================================================================


