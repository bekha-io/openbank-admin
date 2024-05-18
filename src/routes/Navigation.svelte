<script>
	import { page } from '$app/stores';
</script>

<div class="navigation">
	<div class="profile-inline">
		<img src="https://avatar.iran.liara.run/public/32" width="32"/>
		<div class="name">Искандарзода Б.Д.</div>
	</div>
	<div class="section">
		<h3><i class="fa-solid fa-users"></i> Клиенты</h3>
		<a aria-current={$page.url.pathname === '/customers/search' ? 'page' : undefined} href="/customers/search">Поиск клиентов</a>
		<a aria-current={$page.url.pathname === '/customers/create' ? 'page' : undefined} href="/customers/create">Создание клиента</a>
	</div>
	<div class="section">
        <h3><i class="fa-solid fa-vault"></i> Счета</h3>
        <a aria-current={$page.url.pathname === '/accounts/create' ? 'page' : undefined} href="/accounts/create">Создание счета</a>
		<a href="/accounts/newOperation">Создать операцию</a>
	</div>

	<div class="section">
		<h3><i class="fa-solid fa-circle-user"></i> Сотрудники</h3>
		<a href="/employees/search">Поиск сотрудников</a>
	</div>

	<a class="logout" href="/logout">Выйти</a>
</div>

<style>
	.navigation {
		display: flex;
		flex-direction: column;
		background-color: rgb(240, 240, 240);
		padding: 18px 14px;
		min-width: 200px;
		gap: 12px;
	}

	.profile-inline {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}

	.profile-inline > .name {
		font-weight: 600;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.section > h3 {
		line-height: 12px;
	}

	.section > a {
		text-decoration: none;
	}

	.section > a:hover {
		opacity: 0.6;
		transition: 0.5s;
    }

	.logout {
		position: fixed;
		bottom: 24px;
		font-weight: bold;
	}
</style>
